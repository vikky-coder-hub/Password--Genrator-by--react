import { useState ,useCallback, useEffect,useRef} from 'react'


function App() {
 
  const [length ,setLength] = useState(8)
  const [numberAllow ,setNumberAllow] = useState(false)
  const [charAllow,setcharAllow]= useState(false)

  const [Password,setPassword] = useState("")

  //usseRef hook 

  const passwordRef = useRef()
      

  const PasswordGenrateor = useCallback(()=>{

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numberAllow) str += "0123456789"
    if(charAllow) str += "`!~@#$%^&*()_-=+{}[]"
    
    for(let i= 1;i<=length; i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length,numberAllow,charAllow,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,99);
 
    window.navigator.clipboard.writeText(Password)
  },[Password])

     useEffect(()=>{
      PasswordGenrateor()
     },[numberAllow,length,charAllow,PasswordGenrateor])
  
  return (
    <>
     <div className='flex justify-center items-center content-center h-screen'>
    <div className='w-full max-w-md  ms-auto shadow-md rounded-lg px-4 py-4 my-8 text-purple-500 bg-gray-800 '>
    <h1 className='text-vx text-center  text-white text-center my-3'>Password Gentrator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
       <input type ="text" value={Password} className='outline-none w-full py-1 px-3' placeholder="password"
       readOnly ref={passwordRef} />

       <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
       <div className='flex items-ceter gap-x-1'>
        <input type = "range"min={6} max ={100} value={length}
        className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
        <label>Length:{length}</label>
        </div> 
        <div className='flex item-center gap-x-1'>
            <input type='checkbox' defaultChecked = {numberAllow} id = 'numberInput' onChange={()=>{setNumberAllow((prev)=>!prev)}} />
            <label htmlFor = "numberInput">Numbers</label>
        </div>
        <div className='flex item-center gap-x-1'>
            <input type='checkbox' defaultChecked = {charAllow} id = 'numberInput' onChange={()=>{setcharAllow((prev)=>!prev)}} />
            <label htmlFor = "numberInput">Characters</label>
        </div>
      </div>
      </div>
      </div>

    </>
  )
}

export default App
