import React, { useEffect, useState } from 'react'
import todo from '../images/todo.png'

const getLocalData = () => {
    let list = localStorage.getItem('lists')

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return []
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState('')
    const [items, setItems] = useState([]);
    const addItem = () => {
        if(!inputData) {

        } else {
            setItems([...items, inputData])
            setInputData("")
        }
    }

    const deleteItem = (id) => {
        const updateItems = items.filter((elem, ind) => {
            return id !== ind
        })

        setItems(updateItems);
    }

    const removeAll = () => {
        setItems([])
    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items])

    
  return (
    <>
        <div className='flex flex-col gap-2 h-screen items-center mt-20 '>
            <div className=''>
                <figure>
                    <img src={todo} alt="" className='w-20 m-auto justify-center'/>
                    <figcaption className='text-slate-300 text-xl font-extralight my-2'>Add your list here ✌🏻</figcaption>
                </figure>
            </div>

            <div className='bg-white text-lg pl-4 pr-1 py-1 rounded-md' >
                <input type="text" placeholder='✍🏻 Add items...' className='outline-none w-72' 
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                />
                <i className="ri-add-line" onClick={addItem}></i>
            </div>

            {
                items.map((elem, ind) => {
                    return (
                        <div key={ind} className='hover:bg-white hover:text-black px-3 py-1 mt-4 rounded-md flex w-80 justify-between items-center bg-[#5436E0] text-white' >
                            <h3 className='text-lg font-extralight'>{elem}</h3>
                            <i className="ri-delete-bin-line hover:text-red-500" onClick={() => deleteItem(ind)}></i>
                        </div>
                    )
                })
            }

            <div className='bg-white py-2 px-4 font-extralight rounded mt-4 hover:bg-[#5436E0] hover:text-white'>

                {
                    items.length ? <button onClick={removeAll}>Remove All</button> : <button onClick={removeAll}>Check List</button>
                }

            </div>
        </div>
    </>
  )
}

export default Todo
