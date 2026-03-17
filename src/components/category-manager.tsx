"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { generateSlug } from "@/lib/helpers";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  productCount: number;
}

interface CategoryManagerProps {
  categories: Category[];
}

export function CategoryManager({ categories: initialCategories }: CategoryManagerProps) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Add form
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Edit state
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  async function handleAdd() {
    if (!newName.trim()) { setError("Category name is required."); return; }

    setSaving(true);
    setError("");

    try {
      const supabase = createClient();
      const maxSort = categories.length > 0 ? Math.max(...categories.map((c) => c.sort_order)) + 1 : 1;

      const { data, error: insertErr } = await supabase
        .from("categories")
        .insert({
          name: newName.trim(),
          slug: generateSlug(newName),
          description: newDescription.trim() || null,
          sort_order: maxSort,
        })
        .select()
        .single();

      if (insertErr) throw insertErr;

      setCategories((prev) => [...prev, { ...data, productCount: 0 }]);
      setNewName("");
      setNewDescription("");
      setShowAdd(false);
      setSuccess("Category added!");
      router.refresh();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to add category.");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(cat: Category) {
    setEditId(cat.id);
    setEditName(cat.name);
    setEditDescription(cat.description || "");
    setError("");
  }

  async function handleUpdate() {
    if (!editId || !editName.trim()) { setError("Category name is required."); return; }

    setSaving(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: updateErr } = await supabase
        .from("categories")
        .update({
          name: editName.trim(),
          slug: generateSlug(editName),
          description: editDescription.trim() || null,
        })
        .eq("id", editId);

      if (updateErr) throw updateErr;

      setCategories((prev) =>
        prev.map((c) =>
          c.id === editId
            ? { ...c, name: editName.trim(), slug: generateSlug(editName), description: editDescription.trim() || null }
            : c
        )
      );
      setEditId(null);
      setSuccess("Category updated!");
      router.refresh();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update category.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(cat: Category) {
    if (cat.productCount > 0) {
      setError(`Cannot delete "${cat.name}" — it has ${cat.productCount} product(s). Reassign them first.`);
      return;
    }
    if (!confirm(`Delete category "${cat.name}"? This cannot be undone.`)) return;

    setSaving(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: delErr } = await supabase
        .from("categories")
        .delete()
        .eq("id", cat.id);

      if (delErr) throw delErr;

      setCategories((prev) => prev.filter((c) => c.id !== cat.id));
      setSuccess("Category deleted!");
      router.refresh();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to delete category.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-destructive mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg bg-success-light px-4 py-3 text-sm text-success mb-4">
          {success}
        </div>
      )}

      <div className="rounded-xl border border-border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Slug</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Description</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Products</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  {editId === cat.id ? (
                    <>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full rounded-lg border border-input px-2 py-1 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
                        />
                      </td>
                      <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                        {generateSlug(editName)}
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full rounded-lg border border-input px-2 py-1 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block rounded-full bg-rose-pale px-2.5 py-0.5 text-xs font-medium text-rose">
                          {cat.productCount}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={handleUpdate}
                            disabled={saving}
                            className="p-1.5 text-success hover:bg-success-light rounded transition-colors"
                            title="Save"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setEditId(null)}
                            className="p-1.5 text-muted-foreground hover:bg-muted rounded transition-colors"
                            title="Cancel"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 font-medium">{cat.name}</td>
                      <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{cat.slug}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs max-w-[200px] truncate">
                        {cat.description || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block rounded-full bg-rose-pale px-2.5 py-0.5 text-xs font-medium text-rose">
                          {cat.productCount}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEdit(cat)}
                            className="p-1.5 text-muted-foreground hover:text-rose hover:bg-rose-faint rounded transition-colors"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(cat)}
                            disabled={saving}
                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    No categories yet. Add one above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Category Form */}
      {showAdd ? (
        <div className="mt-4 rounded-xl border border-border bg-white p-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Add Category</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Name *</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., Wedding Cakes"
                className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Description</label>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Short description..."
                className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleAdd} disabled={saving} size="sm">
              {saving ? "Saving..." : "Save Category"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => { setShowAdd(false); setNewName(""); setNewDescription(""); }}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-rose px-4 py-2 text-sm font-medium text-rose hover:bg-rose-faint transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      )}
    </div>
  );
}
