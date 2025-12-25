"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteContact, getContacts, reset } from "@/store/features/contactSlice";
import { useEffect, useState } from "react";
import { Contact } from "@/types/api";

const ContactsPage = () => {
    const dispatch = useAppDispatch();
    const { contacts, isLoading, isError, message } = useAppSelector(
        (state) => state.contact
    );

    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    useEffect(() => {
        dispatch(getContacts());

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this message?")) {
            dispatch(deleteContact(id));
        }
    };

    const openModal = (contact: Contact) => {
        setSelectedContact(contact);
    };

    const closeModal = () => {
        setSelectedContact(null);
    };

    return (
        <>
            <Breadcrumb pageName="Messages" />

            <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
                <h4 className="mb-6 text-xl font-bold text-dark dark:text-white">
                    Inbox
                </h4>

                {isLoading ? (
                    <div className="flex h-40 items-center justify-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
                    </div>
                ) : isError ? (
                    <div className="p-4 text-red-500">{message}</div>
                ) : (
                    <div className="flex flex-col">
                        <div className="grid grid-cols-4 rounded-t-[10px] bg-gray-2 px-4 py-4.5 dark:bg-dark-2 sm:grid-cols-5 md:px-6 2xl:px-7.5">
                            <div className="col-span-1 flex items-center">
                                <p className="font-medium">Name</p>
                            </div>
                            <div className="col-span-1 flex items-center">
                                <p className="font-medium">Email</p>
                            </div>
                            <div className="col-span-2 hidden items-center sm:flex">
                                <p className="font-medium">Subject</p>
                            </div>
                            <div className="col-span-1 flex items-center justify-end">
                                <p className="font-medium">Actions</p>
                            </div>
                        </div>

                        {contacts.map((contact: Contact, key: number) => (
                            <div
                                className={`grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-5 md:px-6 2xl:px-7.5 ${key === contacts.length - 1 ? "" : "border-b"
                                    }`}
                                key={key}
                            >
                                <div className="col-span-1 flex items-center">
                                    <p className="text-sm font-medium text-dark dark:text-white">
                                        {contact.name}
                                    </p>
                                </div>
                                <div className="col-span-1 flex items-center">
                                    <p className="text-sm font-medium text-dark dark:text-white">
                                        {contact.email}
                                    </p>
                                </div>
                                <div className="col-span-2 hidden items-center sm:flex">
                                    <p className="text-sm font-medium text-dark dark:text-white truncate pr-4">
                                        {contact.subject}
                                    </p>
                                </div>
                                <div className="col-span-1 flex items-center justify-end space-x-3.5">
                                    <button
                                        onClick={() => openModal(contact)}
                                        className="hover:text-primary"
                                    >
                                        <svg
                                            className="fill-current"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.17812 8.99981 3.17812C14.5686 3.17812 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 9.00001C2.49355 10.1719 4.93106 13.6969 8.99981 13.6969C13.0686 13.6969 15.5061 10.1719 16.1436 9.00001C15.5061 7.82813 13.0686 4.30312 8.99981 4.30312C4.93106 4.30312 2.49355 7.82813 1.85605 9.00001Z"
                                                fill=""
                                            />
                                            <circle cx="9" cy="9" r="2" fill="" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(contact._id || contact.id!)}
                                        className="hover:text-primary"
                                    >
                                        <svg
                                            className="fill-current"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.7531 2.47502H11.5875V1.9969C11.5875 1.15315 10.9125 0.478149 10.0687 0.478149H7.90312C7.05937 0.478149 6.38437 1.15315 6.38437 1.9969V2.47502H4.21875C3.40312 2.47502 2.72812 3.15002 2.72812 3.96565V4.8094C2.72812 5.42815 3.09375 5.9344 3.62812 6.16877L4.44375 15.4406C4.52812 16.5938 5.48437 17.5 6.6375 17.5H11.3344C12.4875 17.5 13.4437 16.5938 13.5281 15.4406L14.3437 6.16877C14.8781 5.9344 15.2437 5.42815 15.2437 4.8094V3.96565C15.2437 3.15002 14.5687 2.47502 13.7531 2.47502ZM7.67812 1.9969C7.67812 1.85627 7.79062 1.74377 7.93125 1.74377H10.0969C10.2375 1.74377 10.35 1.85627 10.35 1.9969V2.47502H7.70625V1.9969H7.67812ZM12.2625 15.3281C12.2344 15.7219 11.925 16.0313 11.5594 16.0313H6.44063C6.075 16.0313 5.76563 15.7219 5.7375 15.3563L4.95 6.2719H13.05L12.2625 15.3281ZM13.9781 4.8094C13.9781 4.9219 13.8937 5.00627 13.7812 5.00627H4.21875C4.10625 5.00627 4.02187 4.9219 4.02187 4.8094V3.96565C4.02187 3.85315 4.10625 3.76877 4.21875 3.76877H13.7812C13.8937 3.76877 13.9781 3.85315 13.9781 3.96565V4.8094Z"
                                                fill=""
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedContact && (
                <div className="fixed left-0 top-0 z-999999 flex h-full w-full items-center justify-center bg-black/90 px-4 py-5">
                    <div className="w-full max-w-142.5 rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:px-17.5 md:py-15">
                        <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                            Message Details
                        </h3>
                        <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
                        <div className="mb-10 text-left">
                            <p className="mb-2 font-semibold">From: <span className="font-normal text-gray-600 dark:text-gray-400">{selectedContact.name} ({selectedContact.email})</span></p>
                            <p className="mb-4 font-semibold">Subject: <span className="font-normal text-gray-600 dark:text-gray-400">{selectedContact.subject}</span></p>
                            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
                                <p className="text-black dark:text-white whitespace-pre-wrap">{selectedContact.message}</p>
                            </div>
                        </div>
                        <button
                            onClick={closeModal}
                            className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactsPage;
