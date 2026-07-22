import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  X,
  ImagePlus,
  BookOpen,
  IndianRupee,
  Ruler,
  Eye,
  FileText,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { Product2 } from "../../../../types/products";
import { fileUploadThunk } from "../../../../features/upload/fileUploadThunk";
import {
  addProductsThunk,
  editProductsThunk,
} from "../../../../features/products/productThunk";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productForEdit?: Product2 | null;
}

const AddProductModal = ({ isOpen, onClose, productForEdit }: Props) => {
  const [product, setProduct] = useState({
    title: productForEdit?.title ?? "",
    price: productForEdit?.price ?? "",
    offerPrice: productForEdit?.offerPrice ?? "",
    pages: productForEdit?.pages ?? "",
    size: productForEdit?.size ?? "",
    description: productForEdit?.description ?? "",
  });

  const [existingThumbnails, setExistingThumbnails] = useState(
    () => productForEdit?.thumbnails ?? [],
  );
  const [thumbnails, setThumbnails] = useState<File[]>([]);

  const [pdf, setPdf] = useState<File | null>(null);
  const [existingPdf, setExistingPdf] = useState(productForEdit?.data ?? "");

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.product);
  const { loading: uploadLoading } = useAppSelector((state) => state.upload);

  const isEditMode = !!productForEdit;

  const hasChanges = isEditMode
    ? product.title !== productForEdit.title ||
      Number(product.price) !== productForEdit.price ||
      Number(product.pages) !== productForEdit.pages ||
      product.size !== productForEdit.size ||
      thumbnails.length > 0 ||
      JSON.stringify(existingThumbnails) !==
        JSON.stringify(productForEdit.thumbnails) ||
      product.offerPrice !== productForEdit.offerPrice ||
      product.description !== productForEdit.description ||
      existingPdf !== productForEdit.data ||
      pdf !== null
    : true;

  if (!isOpen) return null;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    setThumbnails((prev) => [...prev, ...Array.from(files)]);
  };

  const removeImage = (index: number) => {
    setThumbnails((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProduct((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !product.title ||
      !product.price ||
      !product.offerPrice ||
      !product.pages ||
      !product.size ||
      !product.description
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (!pdf && !existingPdf) {
      return toast.error("Please upload the product PDF.");
    }

    if (thumbnails.length === 0 && existingThumbnails.length === 0) {
      return toast.error("Upload at least one image");
    }

    let imageUrls = [...existingThumbnails];

    if (thumbnails.length > 0) {
      try {
        const uploadResult = await dispatch(
          fileUploadThunk({
            file: thumbnails,
            category: "quiz",
          }),
        ).unwrap();

        const uploadedUrls = Array.isArray(uploadResult)
          ? uploadResult.map((img) => img.url)
          : [uploadResult];

        imageUrls = [...imageUrls, ...uploadedUrls];
      } catch (err) {
        toast.error("File upload failed" + err);
        return;
      }
    }

    let pdfUrl = existingPdf;

    if (pdf) {
      interface UploadResponse {
        url: string;
      }

      const result = (await dispatch(
        fileUploadThunk({
          file: [pdf],
          category: "products",
        }),
      ).unwrap()) as UploadResponse[];

      pdfUrl = result[0].url;
    }

    const productData = {
      title: product.title,
      price: Number(product.price),
      offerPrice: Number(product.offerPrice),
      pages: Number(product.pages),
      size: product.size,
      description: product.description,
      thumbnails: imageUrls,
      data: pdfUrl,
    };

    const response = productForEdit
      ? await dispatch(
          editProductsThunk({ productId: productForEdit._id, productData }),
        ).unwrap()
      : await dispatch(addProductsThunk(productData)).unwrap();

    toast.success(response.message);

    setProduct({
      title: "",
      price: "",
      offerPrice: "",
      pages: "",
      size: "",
      description: "",
    });

    setExistingThumbnails([]);
    setExistingPdf("");
    setPdf(null);
    setThumbnails([]);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-5xl rounded-3xl  bg-secondary hide-scrollbar shadow-2xl max-h-[94vh] overflow-y-auto">
        {/* Header */}
        <div className="relative rounded-t-3xl border-b-2 px-8 py-6">
          <h2 className="text-3xl font-extrabold ">
            {isEditMode ? "✏️ Edit Product" : "📚 Add Product"}
          </h2>

          <button
            className="absolute top-4 right-4 hover:text-muted-foreground"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 p-8 md:grid-cols-2">
          {/* Left */}
          <div className="space-y-5">
            <div>
              <label className="mb-2 block font-semibold">Product Title</label>

              <input
                name="title"
                value={product.title}
                onChange={handleChange}
                required
                className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground"
                placeholder="Story Book..."
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold">
                <IndianRupee size={18} />
                Price
              </label>

              <input
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                required
                className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold">
                <IndianRupee size={18} />
                Offer Price
              </label>

              <input
                type="number"
                name="offerPrice"
                value={product.offerPrice}
                onChange={handleChange}
                required
                className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">Description</label>

              <textarea
                rows={5}
                name="description"
                value={product.description}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground"
                placeholder="Enter product description..."
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold">
                <BookOpen size={18} />
                Pages
              </label>

              <input
                name="pages"
                type="number"
                value={product.pages}
                onChange={handleChange}
                required
                className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold">
                <Ruler size={18} />
                Size
              </label>

              <input
                name="size"
                value={product.size}
                onChange={handleChange}
                required
                className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground"
                placeholder="A4 / A5"
              />
            </div>
          </div>

          {/* Right */}
          <div className="space-y-10">
            <div>
              <label className="mb-3 block font-semibold">Product Images</label>

              <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-foreground bg-background hover:bg-background/60">
                <ImagePlus size={42} className="mb-2 text-sky-500" />

                <span className="font-semibold text-sky-600">
                  Click to Select Images
                </span>

                <span className="text-sm text-gray-500">
                  Multiple images supported
                </span>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </label>

              <div className="mt-6 grid grid-cols-3 gap-4">
                {existingThumbnails.map((image, index) => (
                  <div key={`existing-${index}`} className="relative">
                    <img
                      src={image}
                      alt=""
                      className="h-32 w-full rounded-xl object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setExistingThumbnails((prev) =>
                          prev.filter((_, i) => i !== index),
                        )
                      }
                      className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
                {thumbnails.map((image, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-xl border bg-background shadow"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt=""
                      className="h-32 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* PDF Section */}
            <div className="mt-6">
              <label className="mb-3 block font-semibold">Product PDF</label>

              {/* Upload Box */}
              <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-foreground bg-background hover:bg-background/60">
                <FileText size={42} className="mb-2 text-yellow-500" />

                <span className="font-semibold text-yellow-600">
                  Click to Select PDF
                </span>

                <span className="text-sm text-gray-500">PDF files only</span>

                <input
                  hidden
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setPdf(e.target.files[0]);
                    }
                  }}
                />
              </label>

              {(pdf || existingPdf) && (
                <div className="mt-5 rounded-2xl border border-yellow-100 bg-background p-5 shadow">
                  <div className="flex items-center gap-4">
                    {/* PDF Icon */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100">
                      <FileText size={34} className="text-yellow-500" />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">
                        {pdf?.name || "Uploaded Product PDF"}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {pdf
                          ? `${(pdf.size / 1024 / 1024).toFixed(2)} MB`
                          : "PDF already uploaded"}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <a
                        href={pdf ? URL.createObjectURL(pdf) : existingPdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl bg-sky-500 p-3 text-white transition hover:bg-sky-600"
                        title="View PDF"
                      >
                        <Eye size={18} />
                      </a>

                      <a
                        href={pdf ? URL.createObjectURL(pdf) : existingPdf}
                        download
                        className="rounded-xl bg-green-500 p-3 text-white transition hover:bg-green-600"
                        title="Download PDF"
                      >
                        <Download size={18} />
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setPdf(null);
                          setExistingPdf("");
                        }}
                        className="rounded-xl bg-red-500 p-3 text-white transition hover:bg-red-600"
                        title="Remove PDF"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="col-span-full flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-gray-200 text-black px-6 py-3 font-semibold hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              disabled={loading || (isEditMode && !hasChanges) || uploadLoading}
              type="submit"
              className="rounded-xl disabled:cursor-not-allowed bg-blue-700 px-8 py-3 disabled:bg-gray-600 font-bold text-white hover:bg-blue-600"
            >
              {loading
                ? isEditMode
                  ? "Updating..."
                  : "Adding..."
                : isEditMode
                  ? "Update Product"
                  : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
