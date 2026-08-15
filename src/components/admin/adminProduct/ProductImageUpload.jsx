import { Image, SquareX } from "lucide-react";

const ProductImageUpload = ({
  image,
  preview,
  setImage,
  setPreview,
  isPending,
  error,
}) => {
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview("");
  };

  return (
    <div className="bg-white rounded-[30px] shadow-sm p-6 h-fit sticky top-6">

      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800">
        Update Image
      </h2>

      <p className="text-sm text-gray-500 mt-1 mb-6">
        Upload a new fish image
      </p>


      {/* Upload */}
      <label
        className={`h-52 rounded-[28px] border-2 border-dashed bg-gray-50 flex flex-col items-center justify-center transition ${
          error?.image
            ? "border-red-500"
            : "border-gray-300 hover:border-(--color-background) hover:bg-(--color-background)/5"
        } ${
          isPending
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer"
        }`}
      >
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          disabled={isPending}
          onChange={handleImageChange}
        />

        <Image
          size={35}
          className="text-gray-400"
        />

        <h3 className="mt-5 text-lg font-semibold text-gray-700">
          Click to Upload
        </h3>

        <p className="text-sm text-gray-400 mt-2">
          PNG, JPG, WEBP
        </p>
      </label>


      {/* Image Error */}
      {error?.image && (
        <p className="text-red-500 text-sm mt-2 pl-1">
          {error.image}
        </p>
      )}


      {/* Preview */}
      <div className="mt-8">

        <h3 className="font-bold text-gray-800 mb-4">
          Image Preview
        </h3>

        <div className="relative h-56 rounded-3xl overflow-hidden border border-gray-200">

          {preview ? (
            <img
              src={preview}
              alt="Fish preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
              No Image
            </div>
          )}

        </div>


        {/* Remove Button */}
        {preview && (
          <button
            type="button"
            disabled={isPending}
            onClick={handleRemoveImage}
            className={`mt-4 h-12 w-full rounded-2xl text-white font-semibold transition flex items-center justify-center gap-2 ${
              isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-(--color-surface) hover:bg-(--color-surface)/90 cursor-pointer"
            }`}
          >
            <SquareX size={18} />
            Remove Image
          </button>
        )}

      </div>

    </div>
  );
};

export default ProductImageUpload;