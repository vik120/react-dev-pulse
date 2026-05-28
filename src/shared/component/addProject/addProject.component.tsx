'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from 'flowbite-react';

import InputComponent from '../../ui/input.component';
import SelectComponent from '../../ui/select.component';
import {
  addProjectSchema,
  AddProjectSchema,
} from '@/src/features/project/addProject.schema';
import { useProjectStore } from '@/src/features/project/project.store';

function AddProjectComponent({handleProjectSubmit}: {handleProjectSubmit: (project: AddProjectSchema) => void}) {
  const [formValue, setFormValue] = useState<AddProjectSchema>({
    projectName: '',
    websiteUrl: '',
    developmentType: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof AddProjectSchema, string>>
  >({});

  const addProject = useProjectStore((state) => state.addProject);

  const getValidationErrors = (values: AddProjectSchema) => {
    const result = addProjectSchema.safeParse(values);

    if (result.success) {
      return {};
    }

    const fieldErrors = result.error.flatten().fieldErrors;

    return Object.fromEntries(
      Object.entries(fieldErrors).map(([field, messages]) => [
        field,
        messages?.[0] ?? 'Invalid value',
      ])
    ) as Partial<Record<keyof AddProjectSchema, string>>;
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = getValidationErrors(formValue);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    console.log(formValue);
    handleProjectSubmit(formValue);
    addProject(formValue);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    const updatedFormValue = {
      ...formValue,
      [name]: value,
    };

    setFormValue(updatedFormValue);
    setErrors(getValidationErrors(updatedFormValue));
  };

  const projectInput = {
    label: 'Project Name',
    type: 'text',
    name: 'projectName',
    id: 'projectName',
    placeholder: 'Project Name',
    required: true,
    value: formValue.projectName,
    error: Boolean(errors.projectName),
    errorMessage: errors.projectName || '',
    onChange: handleInputChange,
  };

  const websiteUrlInput = {
    label: 'Website URL',
    type: 'text',
    name: 'websiteUrl',
    id: 'websiteUrl',
    placeholder: 'Website URL',
    required: true,
    value: formValue.websiteUrl,
    error: Boolean(errors.websiteUrl),
    errorMessage: errors.websiteUrl || '',
    onChange: handleInputChange,
  };

  const developmentTypeInput = {
    label: 'Development Type',
    name: 'developmentType',
    id: 'developmentType',
    required: true,
    value: formValue.developmentType,
    error: Boolean(errors.developmentType),
    errorMessage: errors.developmentType || '',
    showBlank: true,
    dropdownOptions: [
      { value: 'Production', label: 'Production' },
      { value: 'Staging', label: 'Staging' },
      { value: 'Development', label: 'Development' },
    ],
    onChange: handleInputChange,
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="space-y-6">
        <InputComponent inputdata={projectInput} />

        <InputComponent inputdata={websiteUrlInput} />

        <SelectComponent selectData={developmentTypeInput} />

        <div className="w-full">
          <Button type="submit" className="w-full">
            Submit Project
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddProjectComponent;