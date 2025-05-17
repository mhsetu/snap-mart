'use client';
import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useSession } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';
// import { GlobalContext } from '../../../Context Provider/ContextProvider';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export const ProductForm: React.FC = () => {
  const [category, setCategory] = useState([]);
  const { data } = useSession();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedCategory, setSelectedCategory] = useState('');

  console.log(data?.user.name);

  // const [value, setValue] = useState(dayjs(new Date()));
  // const today = dayjs(new Date());
  // const [reset, setReset] = useState(null);
  //   const { user } = useContext(GlobalContext);
  useEffect(() => {
    fetch(`/api/category`)
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, [setCategory]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // const name = form.name.value;
    // const phone = form.phone.value;
    // const location = form.location.value;
    // const brand = form.brand.value;
    // const email = form.email.value;
    // const image = form.image.value;
    // const ram = form.ram.value;
    // const camera = form.camera.value;
    // const duration = form.duration.value;
    // const category = form.category.value;
    // const date = form.date.value;
    // const original = form.original_price.value;
    // const selling = form.selling_price.value;
    // const model = form.model.value;
    // const description = form.description.value;

    const info = {
      // seller_name: form.name.value,
      // phone_number: form.phone.value,
      // email: form.email.value,
      // location: form.location.value,
      // brand: form.brand.value,
      // category_id: form.category.value,
      // picture: form.image.value,
      // ram: form.ram.value,
      // camera: form.camera.value,
      // usage_duration: form.duration.value,
      // posted_date: form.date.value,
      // resale_price: form.selling_price.value,
      // original_price: form.original_price.value,
      // phone_name: form.model.value,
      // phone_description: form.description.value,
      seller_name: (form.elements.namedItem('name') as HTMLInputElement).value,
      phone_number: (form.elements.namedItem('phone') as HTMLInputElement)
        .value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      location: (form.elements.namedItem('location') as HTMLInputElement).value,
      brand: (form.elements.namedItem('brand') as HTMLInputElement).value,
      category_id: (form.elements.namedItem('category') as HTMLSelectElement)
        .value,
      picture: (form.elements.namedItem('image') as HTMLInputElement).value,
      ram: (form.elements.namedItem('ram') as HTMLInputElement).value,
      camera: (form.elements.namedItem('camera') as HTMLInputElement).value,
      usage_duration: (form.elements.namedItem('duration') as HTMLInputElement)
        .value,
      posted_date: (form.elements.namedItem('date') as HTMLInputElement).value,
      resale_price: (
        form.elements.namedItem('selling_price') as HTMLInputElement
      ).value,
      original_price: (
        form.elements.namedItem('original_price') as HTMLInputElement
      ).value,
      phone_name: (form.elements.namedItem('model') as HTMLInputElement).value,
      phone_description: (
        form.elements.namedItem('description') as HTMLTextAreaElement
      ).value,
    };

    console.log(info);
    fetch('/api/phones', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success('Phone added successfully');
        }
      });
  };

  const InputField = ({ label, name, type, ...rest }: InputFieldProps) => (
    <div className='col-span-2'>
      <label className='block text-sm font-semibold text-black'>{label}</label>
      <input
        type={type}
        name={name}
        className='mt-2.5 block input input-bordered w-full rounded-md px-3.5 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm'
        {...rest}
      />
    </div>
  );
  return (
    <div className='px-6 py-24 sm:py-32 lg:px-8'>
      <div className='mx-auto max-w-2xl text-center'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Phone & Personal Details
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className='mx-auto mt-16 max-w-sm sm:mt-20 grid gap-y-6 grid-cols-1 md:grid-cols-2 gap-x-8'
      >
        <InputField
          label='Name'
          name='name'
          defaultValue={data?.user.name}
          readOnly
        />
        <InputField label='Phone Number' name='phone' />
        <InputField label='Location' name='location' required />
        <InputField label='Phone Brand' name='brand' />
        <InputField
          label='Email'
          name='email'
          defaultValue={data?.user.email}
          readOnly
          type='email'
        />
        <InputField label='Phone Name' name='model' />
        <InputField label='Photo URL' name='image' />
        <InputField label='RAM' name='ram' />
        <InputField label='Camera' name='camera' />
        <InputField label='Usage Duration' name='duration' />
        <InputField label='Expected Price' name='selling_price' />
        <InputField label='Original Price' name='original_price' required />

        <div className='col-span-2'>
          <label className='block text-sm font-semibold text-gray-900'>
            Category
          </label>
          <select
            name='category'
            className='select select-bordered mt-2.5 w-full'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            {/* <option disabled selected>
              Choose One
            </option> */}
            {category?.map(({ name, _id }) => (
              <option key={_id} value={_id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className='col-span-2'>
          <label className='block text-sm font-semibold text-gray-900'>
            Date
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateField']}>
              <DateField
                name='date'
                label='Current date'
                readOnly
                // defaultValue={today}
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div className='col-span-2'>
          <label className='block text-sm font-semibold text-gray-900'>
            Description
          </label>
          <textarea
            name='description'
            rows={4}
            placeholder='Describe phone condition'
            className='mt-2.5 block textarea textarea-bordered w-full rounded-md px-3.5 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm'
          ></textarea>
        </div>

        <div className='mt-10 col-span-2'>
          <button
            type='submit'
            className='btn w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500'
          >
            Submit
          </button>
        </div>
      </form>
      <Toaster position='top-center' reverseOrder={false} />
    </div>
  );
};

export default ProductForm;
