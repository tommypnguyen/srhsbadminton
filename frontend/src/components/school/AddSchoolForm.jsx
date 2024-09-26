import { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AuthContext from '../../contexts/AuthContext'
import { addNewSchool } from '../../slices/schoolSlice'

const AddSchoolForm = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [abbr, setAbbr] = useState('')
  const { authTokens } = useContext(AuthContext)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const newSchool = {
        name,
        abbreviation: abbr,
      }
      await dispatch(
        addNewSchool({
          initialSchool: newSchool,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + String(authTokens.access),
          },
        }),
      ).unwrap()
      document.getElementById('add_school_form').close()
      setName('')
      setAbbr('')
    } catch (err) {
      toast.error(
        'Failed to add school. Please make sure you are logged in or all fields are filled.',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        },
      )
    }
  }

  const onBackClick = () => {
    document.getElementById('add_school_form').close()
  }

  return (
    <div className='p-4'>
      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Add New School
          </h2>

          <div>
            <div className='sm:col-span-4'>
              <label
                htmlFor='name'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                School Name
              </label>
              <div className='mt-2'>
                <input
                  id='name'
                  name='name'
                  className='block rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <label
                htmlFor='abbr'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Abbreviation
              </label>
              <div className='mt-2'>
                <input
                  id='abbr'
                  name='abbr'
                  value={abbr}
                  onChange={(e) => setAbbr(e.target.value)}
                  className='block rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button
          type='button'
          onClick={onBackClick}
          className='text-md font-semibold leading-6 text-gray-900'
        >
          Cancel
        </button>
        <button
          type='button'
          onClick={onSubmit}
          className='rounded-md bg-accent/95 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-accent/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/95'
        >
          Save
        </button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddSchoolForm
