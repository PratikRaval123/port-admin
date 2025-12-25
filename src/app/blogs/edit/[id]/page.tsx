"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateBlog, getBlogs, reset } from "@/store/features/blogSlice";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import InputGroup from "@/components/FormElements/InputGroup";

const EditBlogPage = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { id } = useParams();
    const { blogs, isLoading, isError, isSuccess, message } = useAppSelector(
        (state) => state.blog
    );

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        details: "",
        technologies: "",
        readTime: "",
        imageUrl: "",
    });
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        if (blogs.length === 0) {
            dispatch(getBlogs());
        } else if (id) {
            const blog = blogs.find((b) => b._id === id || b.id === id);
            if (blog) {
                setFormData({
                    title: blog.title,
                    description: blog.description,
                    details: blog.details,
                    technologies: blog.technologies ? blog.technologies.join(", ") : "",
                    readTime: blog.readTime || "",
                    imageUrl: blog.imageUrl || "",
                });
            }
        }
    }, [id, blogs, dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("details", formData.details);
        data.append("readTime", formData.readTime);
        formData.technologies.split(",").forEach(tag => data.append("technologies", tag.trim()));

        if (image) {
            data.append("image", image);
        }

        if (id) {
            const resultAction = await dispatch(updateBlog({ id: id as string, blogData: data }));
            if (updateBlog.fulfilled.match(resultAction)) {
                router.push("/blogs");
            }
        }
    };

    useEffect(() => {
        return () => { dispatch(reset()); }
    }, [dispatch]);

    return (
        <>
            <Breadcrumb pageName="Edit Blog" />

            <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                    <h3 className="font-semibold text-dark dark:text-white">
                        Edit Blog
                    </h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6.5">
                        {isError && (
                            <div className="mb-4 text-red-500">{message}</div>
                        )}

                        <InputGroup
                            type="text"
                            label="Title"
                            placeholder="Blog Title"
                            name="title"
                            value={formData.title}
                            handleChange={handleChange as any}
                            required
                            className="mb-4.5"
                        />

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Short Description
                            </label>
                            <textarea
                                rows={3}
                                name="description"
                                placeholder="Short Description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Content (Rich Text / HTML)
                            </label>
                            <textarea
                                rows={10}
                                name="details"
                                placeholder="Blog Content"
                                value={formData.details}
                                onChange={handleChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                        </div>

                        <InputGroup
                            type="text"
                            label="Tags (comma separated)"
                            placeholder="React, Tech, Coding"
                            name="technologies"
                            value={formData.technologies}
                            handleChange={handleChange as any}
                            className="mb-4.5"
                        />

                        <InputGroup
                            type="text"
                            label="Read Time"
                            placeholder="5 min read"
                            name="readTime"
                            value={formData.readTime}
                            handleChange={handleChange as any}
                            className="mb-4.5"
                        />

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Blog Image (Optional)
                            </label>
                            {formData.imageUrl && !image && (
                                <div className="mb-2">
                                    <p className="text-sm text-gray-500">Current Image: {formData.imageUrl}</p>
                                </div>
                            )}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                            />
                        </div>

                        <button
                            type="submit"
                            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                            disabled={isLoading}
                        >
                            {isLoading ? "Updating..." : "Update Blog"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditBlogPage;
