import { Image, SquareX } from "lucide-react";

const ProductImageUpload = ({
  image,
  preview,
  setImage,
  setPreview,
  isPending,
}) => {
  return (
    <div className="bg-white rounded-[30px] shadow-sm p-6 h-fit sticky top-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Update Image
      </h2>

      <p className="text-sm text-gray-500 mt-1 mb-6">
        Upload a new fish image
      </p>

      <label className="h-52 rounded-[28px] border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-(--color-background) hover:bg-(--color-background)/5 transition">
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];

            setImage(file);
            setPreview(URL.createObjectURL(file));
          }}
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

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">
            Image Preview
          </h3>
        </div>

        <div className="relative h-56 rounded-3xl overflow-hidden group border border-gray-200">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          <button
            type="button"
            disabled={isPending}
            onClick={() => {
              setImage(null);
              setPreview("");
            }}
            className={`h-14 w-full rounded-2xl text-white font-semibold transition ${
              isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-(--color-surface) hover:bg-(--color-surface)/90"
            }`}
          >
            <SquareX size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductImageUpload;