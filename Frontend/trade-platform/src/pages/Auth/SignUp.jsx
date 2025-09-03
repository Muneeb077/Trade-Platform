import React, {useState} from 'react'
import { Link} from 'react-router-dom'
import { validateEmail } from '../../utils/helper';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/Input';


const SignUp = () => {
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if(!fullName) {
      setError('Please enter your Full Name')
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
       return;
    }
    
    if (!password) {
      setError('Password is required');
        return;
    }
    setError("");
  
    //signUp API Call
  }
  
  return (
    <AuthLayout>
      <div className='lg:w[100%] h-auto md:h-full md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignUp}>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input 
              value={fullName}
              onChange={({target}) => setFullName(target.value)}
              label='Full Name'
              placeholder='John Wick'
              type='text'
            />

            <Input
              value={email}
              onChange={({target}) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type='text'
            />
            <div className='col-span-2'>
              <Input
                value={password}
                onChange={({target}) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type='password'
              />
            </div>
            
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          
          <button
            type='submit'
            className='btn-blue-900'>
              <Link to='/login'>SignUp</Link>
            </button>
          
          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?{""}
            <Link className='font-medium text-slate-900 underline' to='/login'>
            Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp