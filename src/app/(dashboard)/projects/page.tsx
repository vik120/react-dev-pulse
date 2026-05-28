'use client' 
import { AddProjectSchema } from '@/src/features/project/addProject.schema';
import { Project } from '@/src/features/project/project.types';
import { useProjectStore } from '@/src/features/project/project.store';
import AddProjectComponent from '@/src/shared/component/addProject/addProject.component';
import DropdownUi from '@/src/shared/ui/dropdown.ui';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'

function ProjectComponent() {
    // const projects: Project[] = [
    //     {
    //         id: "1",
    //         name: "Project 1",
    //         websiteUrl: "https://project1.com",
    //         environment: "production",
    //         projectKey: "project1",
    //         status: "active",
    //         totalErrors: 10,
    //         lastEventTime: "2022-01-01",
    //         createdDate: "2022-01-01"
    //     },
    //     {
    //         id: "2",
    //         name: "Project 2",
    //         websiteUrl: "https://project2.com",
    //         environment: "staging",
    //         projectKey: "project2",
    //         status: "inactive",
    //         totalErrors: 5,
    //         lastEventTime: "2022-01-02",
    //         createdDate: "2022-01-02"
    //     },
    //     {
    //         id: "3",
    //         name: "Project 3",
    //         websiteUrl: "https://project3.com",
    //         environment: "development",
    //         projectKey: "project3",
    //         status: "active",
    //         totalErrors: 3,
    //         lastEventTime: "2022-01-03",
    //         createdDate: "2022-01-03"
    //     }
    // ];
    const [openModal, setOpenModal] = useState(false);
    const projects = useProjectStore((state) => state.projects);

    const handleProjectSubmit = (project: AddProjectSchema) => {
        console.log(project);
        setOpenModal(false); 
    };
    return (
        <>
        
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto px-4 lg:px-4">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <FiSearch />
                                        </div>
                                        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search projects..." required={false} />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 shrink-0">
                                <button type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" onClick={() => setOpenModal(true)}>
                                     
                                    <FaPlus  className="h-3.0 w-3.0 mr-2" />
                                    Create Project
                                </button>
                                 
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Project name</th>
                                        <th scope="col" className="px-4 py-3">Website URL</th>
                                        <th scope="col" className="px-4 py-3">Environment</th>
                                        <th scope="col" className="px-4 py-3">Status</th>
                                        <th scope="col" className="px-4 py-3">Total errors</th>
                                        <th scope="col" className="px-4 py-3">Last event time</th>
                                        <th scope="col" className="px-4 py-3">Created date</th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                {
                                    projects.length === 0 ? (
                                        <tbody>
                                            <tr>
                                                <td colSpan={7} className="px-4 py-3 text-center">
                                                    <div className='my-5'>
                                                        <p className="px-4">No projects yet</p>
                                                        <p className="px-4 py-3">Create your first monitoring project to start tracking errors and performance.</p>
                                                        <p className="px-4 pt-4 text-center">
                                                             <button   onClick={() => setOpenModal(true)} type="button" className="inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                     
                                                                <FaPlus  className="h-3.0 w-3.0 mr-2" />
                                                                Create Project
                                                            </button>
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ) : null
                                }
                                <tbody>
                                    {
                                        projects.map((project: Project) => {
                                            return (
                                                <tr key={project.id} className="border-b dark:border-gray-700">
                                                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{project.name}</th>
                                                    <td className="px-4 py-3">{project.websiteUrl}</td>
                                                    <td className="px-4 py-3">{project.environment}</td>
                                                    <td className="px-4 py-3">{project.status}</td>
                                                    <td className="px-4 py-3">{project.totalErrors}</td>
                                                    <td className="px-4 py-3">{project.lastEventTime}</td>
                                                    <td className="px-4 py-3">{project.createdDate}</td>
                                                    <td  className="px-4 py-3 flex items-center justify-end">
                                                        <DropdownUi
                                                            items={[
                                                                { label: 'Show', href: `/projects/${project.id}` },
                                                                { label: 'Edit', href: `/projects/${project.id}/edit` },
                                                                { label: 'Delete' },
                                                            ]}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    } 
                                </tbody>
                            </table>
                        </div>
                        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Showing
                                <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
                                of
                                <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                            </span>
                            <ul className="inline-flex items-stretch -space-x-px">
                                <li>
                                    <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Previous</span>
                                        <GrFormPrevious />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                </li>
                                <li>
                                    <a href="#" aria-current="page" className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Next</span>
                                        <GrFormNext />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
      <Modal dismissible show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
        <ModalHeader className='p-5'>
          Add New Project
        </ModalHeader>
        <ModalBody>
           <AddProjectComponent handleProjectSubmit={(project) => handleProjectSubmit(project)} />
        </ModalBody>
      </Modal>
    </>
    )
}

export default ProjectComponent
