"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { generateSlug } from "@/lib/helpers";
import { IMAGE_CONFIG } from "@/lib/constants";
import { Plus, Trash2, Upload, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface SizeRow {
  id?: string;
  name: string;
  price: number;
  sort_order: number;
  _isNew?: boolean;
  _deleted?: boolean;
}

interface ProductFormProps {
  mode: "create" | "edit";
  product?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    base_price: number;
    category_id?: string;
    category?: { id: string; name: string; slug: string } | null;
    lead_time_days: number;
    is_visible: boolean;
    is_featured: boolean;
    sizes?: { id: string; name: string; price: number; sort_order: number }[];
    flavors?: { id: string; name: string; sort_order: number }[];
    images?: { id: string; url: string; storage_path: string; is_main: boolean; sort_order: number }[];
  };
  categories: Category[];
}

export function ProductForm({ mode, product, categories }: ProductFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form fields
  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [description, setDescription] = useState(product?.description || "");
  const [categoryId, setCategoryId] = useState(
    product?.category?.id || product?.category_id || (categories[0]?.id ?? "")
  );
  const [leadTimeDays, setLeadTimeDays] = useState(product?.lead_time_days ?? 2);
  const [isVisible, setIsVisible] = useState(product?.is_visible ?? true);
  const [isFeatured, setIsFeatured] = useState(product?.is_featured ?? false);

  // Sizes state
  const [sizes, setSizes] = useState<SizeRow[]>(() => {
    if (product?.sizes && product.sizes.length > 0) {
      return product.sizes
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((s) => ({ id: s.id, name: s.name, price: s.price, sort_order: s.sort_order }));
    }
    return [{ name: "", price: 0, sort_order: 0, _isNew: true }];
  });

  // Flavors state
  const [flavorInput, setFlavorInput] = useState("");
  const [flavors, setFlavors] = useState<{ id?: string; name: string; _isNew?: boolean; _deleted?: boolean }[]>(() => {
    if (product?.flavors && product.flavors.length > 0) {
      return product.flavors
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((f) => ({ id: f.id, name: f.name }));
    }
    return [];
  });

  // Image state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImages, setExistingImages] = useState(product?.images || []);

  // Auto-generate slug from name (only in create mode)
  useEffect(() => {
    if (mode === "create" && name) {
      setSlug(generateSlug(name));
    }
  }, [name, mode]);

  // Sizes helpers
  function addSizeRow() {
    setSizes((prev) => [
      ...prev,
      { name: "", price: 0, sort_order: prev.length, _isNew: true },
    ]);
  }

  function removeSizeRow(index: number) {
    setSizes((prev) => {
      const row = prev[index];
      if (row.id && !row._isNew) {
        return prev.map((s, i) => (i === index ? { ...s, _deleted: true } : s));
      }
      return prev.filter((_, i) => i !== index);
    });
  }

  function updateSizeRow(index: number, field: "name" | "price", value: string) {
    setSizes((prev) =>
      prev.map((s, i) =>
        i === index
          ? { ...s, [field]: field === "price" ? parseFloat(value) || 0 : value }
          : s
      )
    );
  }

  const visibleSizes = sizes.filter((s) => !s._deleted);

  // Flavor helpers
  const visibleFlavors = flavors.filter((f) => !f._deleted);

  function addFlavor() {
    const trimmed = flavorInput.trim();
    if (!trimmed) return;
    if (visibleFlavors.some((f) => f.name.toLowerCase() === trimmed.toLowerCase())) {
      setError("Flavor already added.");
      return;
    }
    setFlavors((prev) => [...prev, { name: trimmed, _isNew: true }]);
    setFlavorInput("");
    setError("");
  }

  function removeFlavor(index: number) {
    setFlavors((prev) => {
      const row = prev[index];
      if (row.id && !row._isNew) {
        return prev.map((f, i) => (i === index ? { ...f, _deleted: true } : f));
      }
      return prev.filter((_, i) => i !== index);
    });
  }

  function handleFlavorKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      addFlavor();
    }
  }

  // Image helpers
  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!IMAGE_CONFIG.allowedTypes.includes(file.type as any)) {
      setError("Invalid image type. Use JPEG, PNG, or WebP.");
      return;
    }
    if (file.size > IMAGE_CONFIG.maxSizeBytes) {
      setError(`Image too large. Maximum size is ${IMAGE_CONFIG.maxSizeMB} MB.`);
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");
  }

  function clearImage() {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function uploadImage(supabase: any, productId: string): Promise<{ url: string; storagePath: string } | null> {
    if (!imageFile) return null;

    const ext = imageFile.name.split(".").pop() || "jpg";
    const storagePath = `${productId}/${Date.now()}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from(IMAGE_CONFIG.bucket)
      .upload(storagePath, imageFile, { upsert: true });

    if (uploadErr) throw new Error(`Image upload failed: ${uploadErr.message}`);

    const { data: urlData } = supabase.storage
      .from(IMAGE_CONFIG.bucket)
      .getPublicUrl(storagePath);

    return { url: urlData.publicUrl, storagePath };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!name.trim()) { setError("Product name is required."); return; }
    if (!description.trim()) { setError("Description is required."); return; }
    if (!categoryId) { setError("Please select a category."); return; }

    const activeSizes = visibleSizes.filter((s) => s.name.trim() && s.price > 0);
    if (activeSizes.length === 0) {
      setError("Add at least one size with a name and price.");
      return;
    }

    if (mode === "create" && !imageFile && existingImages.length === 0) {
      setError("Please upload a product image.");
      return;
    }

    setSaving(true);

    try {
      const supabase = createClient();
      const basePrice = Math.min(...activeSizes.map((s) => s.price));

      const productData = {
        name: name.trim(),
        slug: slug.trim() || generateSlug(name),
        description: description.trim(),
        base_price: basePrice,
        category_id: categoryId,
        lead_time_days: leadTimeDays,
        is_visible: isVisible,
        is_featured: isFeatured,
      };

      if (mode === "create") {
        // Insert product
        const { data: newProduct, error: insertError } = await supabase
          .from("products")
          .insert(productData)
          .select("id")
          .single();

        if (insertError) throw insertError;

        const productId = newProduct.id;

        // Insert sizes
        const sizeInserts = activeSizes.map((s, i) => ({
          product_id: productId,
          name: s.name.trim(),
          price: s.price,
          sort_order: i,
        }));
        const { error: sizeErr } = await supabase
          .from("product_sizes")
          .insert(sizeInserts);
        if (sizeErr) throw sizeErr;

        // Insert flavors
        const activeFlavors = visibleFlavors.filter((f) => f.name.trim());
        if (activeFlavors.length > 0) {
          const flavorInserts = activeFlavors.map((f, i) => ({
            product_id: productId,
            name: f.name.trim(),
            sort_order: i,
          }));
          const { error: flavorErr } = await supabase
            .from("product_flavors")
            .insert(flavorInserts);
          if (flavorErr) throw flavorErr;
        }

        // Upload image
        const imgResult = await uploadImage(supabase, productId);
        if (imgResult) {
          const { error: imgErr } = await supabase
            .from("product_images")
            .insert({
              product_id: productId,
              url: imgResult.url,
              storage_path: imgResult.storagePath,
              is_main: true,
              sort_order: 0,
            });
          if (imgErr) throw imgErr;
        }

        router.push("/admin/products");
        router.refresh();
      } else if (product) {
        // Update product
        const { error: updateError } = await supabase
          .from("products")
          .update(productData)
          .eq("id", product.id);
        if (updateError) throw updateError;

        // Handle sizes: delete removed, update existing, insert new
        const toDelete = sizes.filter((s) => s._deleted && s.id);
        const toUpdate = activeSizes.filter((s) => s.id && !s._isNew);
        const toInsert = activeSizes.filter((s) => !s.id || s._isNew);

        // Delete
        for (const s of toDelete) {
          await supabase.from("product_sizes").delete().eq("id", s.id);
        }

        // Update existing
        for (let i = 0; i < toUpdate.length; i++) {
          const s = toUpdate[i];
          await supabase
            .from("product_sizes")
            .update({ name: s.name.trim(), price: s.price, sort_order: i })
            .eq("id", s.id);
        }

        // Insert new
        if (toInsert.length > 0) {
          const insertData = toInsert.map((s, i) => ({
            product_id: product.id,
            name: s.name.trim(),
            price: s.price,
            sort_order: toUpdate.length + i,
          }));
          const { error: sizeInsertErr } = await supabase
            .from("product_sizes")
            .insert(insertData);
          if (sizeInsertErr) throw sizeInsertErr;
        }

        // Handle flavors: delete removed, insert new
        const flavorsToDelete = flavors.filter((f) => f._deleted && f.id);
        const flavorsToInsert = visibleFlavors.filter((f) => f._isNew && f.name.trim());

        for (const f of flavorsToDelete) {
          await supabase.from("product_flavors").delete().eq("id", f.id);
        }

        if (flavorsToInsert.length > 0) {
          const flavorData = flavorsToInsert.map((f, i) => ({
            product_id: product.id,
            name: f.name.trim(),
            sort_order: visibleFlavors.filter((vf) => !vf._isNew).length + i,
          }));
          const { error: flavorInsertErr } = await supabase
            .from("product_flavors")
            .insert(flavorData);
          if (flavorInsertErr) throw flavorInsertErr;
        }

        // Upload new image if provided
        if (imageFile) {
          const imgResult = await uploadImage(supabase, product.id);
          if (imgResult) {
            // Set all existing images to not main
            await supabase
              .from("product_images")
              .update({ is_main: false })
              .eq("product_id", product.id);

            const { error: imgErr } = await supabase
              .from("product_images")
              .insert({
                product_id: product.id,
                url: imgResult.url,
                storage_path: imgResult.storagePath,
                is_main: true,
                sort_order: 0,
              });
            if (imgErr) throw imgErr;
          }
        }

        setSuccess("Product updated successfully!");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Failed to save product.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!product) return;
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;

    setSaving(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: delError } = await supabase
        .from("products")
        .update({ is_deleted: true, is_visible: false })
        .eq("id", product.id);

      if (delError) throw delError;

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to delete product.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg bg-success-light px-4 py-3 text-sm text-success">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="rounded-xl border border-border bg-white p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Product Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full rounded-lg border border-input px-3 py-2 text-sm font-mono focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Auto-generated from name. Used in URL: /cakes/{slug || "..."}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Category <span className="text-destructive">*</span>
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                  className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
                >
                  <option value="">— Select category —</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Description <span className="text-destructive">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                  className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Lead Time (days)
                </label>
                <input
                  type="number"
                  value={leadTimeDays}
                  onChange={(e) => setLeadTimeDays(parseInt(e.target.value) || 2)}
                  min={1}
                  className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Sizes & Pricing */}
          <div className="rounded-xl border border-border bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Sizes & Pricing <span className="text-destructive">*</span>
              </h2>
              <button
                type="button"
                onClick={addSizeRow}
                className="inline-flex items-center gap-1 rounded-lg border border-rose px-3 py-1.5 text-xs font-medium text-rose hover:bg-rose-faint transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Size
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Add at least one size. The lowest price will be shown as the starting price.
            </p>
            <div className="space-y-3">
              {sizes.map((size, index) =>
                size._deleted ? null : (
                  <div key={size.id || `new-${index}`} className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={size.name}
                        onChange={(e) => updateSizeRow(index, "name", e.target.value)}
                        placeholder="e.g., 6 inches, 8 inches, 2-Layer"
                        className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
                      />
                    </div>
                    <div className="w-32">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₱</span>
                        <input
                          type="number"
                          value={size.price || ""}
                          onChange={(e) => updateSizeRow(index, "price", e.target.value)}
                          placeholder="0.00"
                          min={1}
                          step="0.01"
                          className="w-full rounded-lg border border-input pl-7 pr-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
                        />
                      </div>
                    </div>
                    {visibleSizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSizeRow(index)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        title="Remove size"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Flavors */}
          <div className="rounded-xl border border-border bg-white p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Flavors
            </h2>
            <p className="text-xs text-muted-foreground mb-3">
              Add available flavors for this product. Customers will choose from these when ordering.
            </p>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={flavorInput}
                onChange={(e) => setFlavorInput(e.target.value)}
                onKeyDown={handleFlavorKeyDown}
                placeholder="e.g., Chocolate, Vanilla, Ube"
                className="flex-1 rounded-lg border border-input px-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
              />
              <button
                type="button"
                onClick={addFlavor}
                className="inline-flex items-center gap-1 rounded-lg border border-rose px-3 py-1.5 text-xs font-medium text-rose hover:bg-rose-faint transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
            </div>
            {visibleFlavors.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {visibleFlavors.map((flavor, index) => (
                  <span
                    key={flavor.id || `new-${index}`}
                    className="inline-flex items-center gap-1 rounded-full bg-rose-pale px-3 py-1 text-xs font-medium text-rose"
                  >
                    {flavor.name}
                    <button
                      type="button"
                      onClick={() => removeFlavor(flavors.indexOf(flavor))}
                      className="ml-0.5 hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Settings */}
          <div className="rounded-xl border border-border bg-white p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Settings
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={(e) => setIsVisible(e.target.checked)}
                  className="rounded border-input"
                />
                <span className="text-sm">Visible on website</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-input"
                />
                <span className="text-sm">Featured product</span>
              </label>
            </div>
          </div>

          {/* Image Upload */}
          <div className="rounded-xl border border-border bg-white p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Product Image {mode === "create" && <span className="text-destructive">*</span>}
            </h2>

            {/* Existing images */}
            {existingImages.length > 0 && !imagePreview && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {existingImages.map((img) => (
                  <div
                    key={img.id}
                    className="relative aspect-square rounded-lg overflow-hidden bg-muted"
                  >
                    <img
                      src={img.url}
                      alt={product?.name || "Product"}
                      className="object-cover w-full h-full"
                    />
                    {img.is_main && (
                      <div className="absolute top-1 right-1 bg-rose text-white text-xs px-2 py-0.5 rounded">
                        Main
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Preview of new image */}
            {imagePreview && (
              <div className="relative mb-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 right-2 rounded-full bg-white/90 p-1 shadow hover:bg-white transition-colors"
                >
                  <X className="h-4 w-4 text-destructive" />
                </button>
                <p className="text-xs text-muted-foreground mt-2">
                  New image selected — will be uploaded on save.
                </p>
              </div>
            )}

            {/* Upload button */}
            <input
              ref={fileInputRef}
              type="file"
              accept={IMAGE_CONFIG.allowedTypes.join(",")}
              onChange={handleImageSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input px-4 py-6 text-sm text-muted-foreground hover:border-rose hover:text-rose transition-colors"
            >
              <Upload className="h-4 w-4" />
              {imagePreview
                ? "Change Image"
                : existingImages.length > 0
                ? "Upload New Image"
                : "Upload Image"}
            </button>
            <p className="text-xs text-muted-foreground mt-2">
              JPEG, PNG, or WebP. Max {IMAGE_CONFIG.maxSizeMB} MB.
            </p>
          </div>

          {/* Actions */}
          <div className="rounded-xl border border-border bg-white p-6 space-y-3">
            <Button
              type="submit"
              disabled={saving}
              className="w-full"
              size="lg"
            >
              {saving
                ? "Saving..."
                : mode === "create"
                ? "Create Product"
                : "Save Changes"}
            </Button>

            {mode === "edit" && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="w-full rounded-lg border border-destructive px-4 py-2 text-sm font-medium text-destructive hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                Delete Product
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
