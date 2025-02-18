import { useForm } from "react-hook-form";
import { useUsers } from "../../../../utils/TanstackQuery/TanstackQuery";
import { FiImage } from "react-icons/fi";
import swal from "sweetalert";
import { useState } from "react";
import { usePublicAxios } from "../../../../utils/AxiosInstance/PublicAxiosInstance";
const AddProperty = () => {
  const axios = usePublicAxios();
  const { data: loggedUser } = useUsers();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      data.propertyImage = imagePreview;
      data.image = loggedUser?.image;
      const response = await axios.post("/api/agent/add_property", data);
      console.log(data)
      if (response?.data?.success) {
        swal({
          title: response?.data?.message,
          icon: "success",
        });
        setLoading(false);
      } else {
        swal({
          title: response?.data?.message,
          icon: "warning",
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };

  const handleImagePreview = (event) => {
    const file = event.target.files?.[0];
    if (file.size > 200000) {
      swal({
        title: "Image is bigger than 2 MB",
        text: "Please select less than 2 MB image",
        icon: "warning",
      });
      setImagePreview(null);
    } else {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <main>
      <div className=" pt-5 pb-20">
        <h1 className=" text-center text-3xl font-semibold">Add Propertise</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-md space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              Property Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Property Location
            </label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Property Picture
            </label>
            <div className="relative mt-1">
              <FiImage
                className="absolute top-3 left-3 text-gray-400"
                size={20}
              />
              <input
                id="image"
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "Profile picture is required",
                })}
                onChange={handleImagePreview}
                className="pl-10 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-20 h-20 rounded-full object-cover"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Price Range(Min)
            </label>
            <input
              type="number"
              {...register("priceRangeMin", {
                required: "Price range is required",
              })}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.priceRangeMin && (
              <p className="text-red-500 text-sm">
                {errors.priceRangeMin.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Price Range(Max)
            </label>
            <input
              type="number"
              {...register("priceRangeMax", {
                required: "Price range is required",
              })}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.priceRangeMax && (
              <p className="text-red-500 text-sm">
                {errors.priceRangeMax.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Agent Name</label>
            <input
              type="text"
              value={loggedUser?.name} // Replace with actual logic
              name="name"
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
              {...register("name", {
                required: "Name is required",
              })}
            />

            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Agent Email
            </label>
            <input
              type="email"
              value={loggedUser?.email} // Replace with actual logic
              name="email"
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {!loading ? (
              "Add Property"
            ) : (
              <div className=" loading loading-spinner loading-md"></div>
            )}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddProperty;
