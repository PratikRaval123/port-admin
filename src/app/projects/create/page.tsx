"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createProject, reset } from "@/store/features/projectSlice";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import InputGroup from "@/components/FormElements/InputGroup";

const CreateProjectPage = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { isLoading, isError, isSuccess, message } = useAppSelector(
        (state) => state.project
    );

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        technologies: "",
        liveUrl: "",
    });
    const [image, setImage] = useState<File | null>(null);

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
        data.append("liveUrl", formData.liveUrl);
        formData.technologies.split(",").forEach(tag => data.append("technologies", tag.trim()));

        if (image) {
            data.append("image", image);
        }

        const resultAction = await dispatch(createProject(data));
        if (createProject.fulfilled.match(resultAction)) {
            router.push("/projects");
        } else {
            console.error("Failed to create project:", resultAction.payload);
        }
    };

    // useEffect(() => {
    //     if (isSuccess) {
    //         router.push("/projects");
    //         dispatch(reset());
    //     }
    // }, [isSuccess, router, dispatch]);

    return (
        <>
            <Breadcrumb pageName="Add Project" />

            <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                    <h3 className="font-semibold text-dark dark:text-white">
                        Create Project
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
                            placeholder="Project Title"
                            name="title"
                            value={formData.title}
                            handleChange={handleChange as any}
                            required
                            className="mb-4.5"
                        />

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Description
                            </label>
                            <textarea
                                rows={6}
                                name="description"
                                placeholder="Project Description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                        </div>

                        <InputGroup
                            type="text"
                            label="Technologies (comma separated)"
                            placeholder="React, Node.js, Tailwind"
                            name="technologies"
                            value={formData.technologies}
                            handleChange={handleChange as any}
                            className="mb-4.5"
                        />

                        <InputGroup
                            type="text"
                            label="Live URL"
                            placeholder="https://example.com"
                            name="liveUrl"
                            value={formData.liveUrl}
                            handleChange={handleChange as any}
                            className="mb-4.5"
                        />

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Project Image
                            </label>
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
                            {isLoading ? "Creating..." : "Create Project"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateProjectPage;
