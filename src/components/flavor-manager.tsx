"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

interface Flavor {
  id: string;
  name: string;
  productCount: number;
}

interface FlavorManagerProps {
  flavors: Flavor[];
}

export function FlavorManager({ flavors: initialFlavors }: FlavorManagerProps) {
  const router = useRouter();
  const [flavors, setFlavors] = useState(initialFlavors);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Add form
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");

  // Edit state
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  async function handleAdd() {
    if (!newName.trim()) { setError("Flavor name is required."); return; }

    setSaving(true);
    setError("");

    try {
      const supabase = createClient();

      // Check if a flavor with the same name already exists as a product_flavor
      // Flavors are stored per-product in product_flavors table
      // For global flavor management, we'll add to a master flavors list
      // But since the DB uses product_flavors directly, we store in a separate table or approach

      // Since the DB schema uses product_flavors (per-product), this manager
      // acts as a reference view. We'll query distinct flavor names.
      // For adding, we just track the name in state (it gets used in ProductForm).

      // Actually, let me check if there's a master flavors table...
      // The schema only has product_flavors. So we'll manage flavors as unique names
      // across all product_flavors entries.

      // For a "global" add, there's nothing to insert until it's assigned to a product.
      // Instead, let's just validate and show it in the list.

      // Better approach: We can still track this. Let the user add flavors here
      // and they appear as options in the ProductForm.
      // But without a master table, we'll just show existing ones.

      setError("Flavors are managed per-product. Use the product form to add flavors to specific products.");
      setSaving(false);
      return;
    } catch (err: any) {
      setError(err.message || "Failed to add flavor.");
    } finally {
      setSaving(false);
    }
  }

  async function handleRename() {
    if (!editId || !editName.trim()) { setError("Flavor name is required."); return; }

    setSaving(true);
    setError("");

    try {
      const supabase = createClient();
      const oldFlavor = flavors.find((f) => f.id === editId);
      if (!oldFlavor) return;

      // Rename all product_flavors with this name
      const { error: updateErr } = await supabase
        .from("product_flavors")
        .update({ name: editName.trim() })
        .eq("name", oldFlavor.name);

      if (updateErr) throw updateErr;

      setFlavors((prev) =>
        prev.map((f) =>
          f.id === editId ? { ...f, name: editName.trim() } : f
        )
      );
      setEditId(null);
      setSuccess("Flavor renamed across all products!");
      router.refresh();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to rename flavor.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(flavor: Flavor) {
    if (!confirm(`Delete flavor "${flavor.name}" from all ${flavor.productCount} product(s)? This cannot be undone.`)) return;

    setSaving(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: delErr } = await supabase
        .from("product_flavors")
        .delete()
        .eq("name", flavor.name);

      if (delErr) throw delErr;

      setFlavors((prev) => prev.filter((f) => f.id !== flavor.id));
      setSuccess("Flavor deleted from all products!");
      router.refresh();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to delete flavor.");
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
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Flavor Name</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Used In Products</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {flavors.length > 0 ? (
                flavors.map((flavor) => (
                  <tr key={flavor.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    {editId === flavor.id ? (
                      <>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full rounded-lg border border-input px-2 py-1 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleRename(); } }}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded-full bg-rose-pale px-2.5 py-0.5 text-xs font-medium text-rose">
                            {flavor.productCount}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={handleRename}
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
                        <td className="px-4 py-3 font-medium">{flavor.name}</td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded-full bg-rose-pale px-2.5 py-0.5 text-xs font-medium text-rose">
                            {flavor.productCount}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => { setEditId(flavor.id); setEditName(flavor.name); setError(""); }}
                              className="p-1.5 text-muted-foreground hover:text-rose hover:bg-rose-faint rounded transition-colors"
                              title="Rename"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(flavor)}
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
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-4 py-12 text-center text-muted-foreground">
                    No flavors yet. Add flavors to products using the product form.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Flavors are managed per-product. Add or remove flavors when creating or editing a product.
        Renaming or deleting a flavor here applies the change across all products that use it.
      </p>
    </div>
  );
}
