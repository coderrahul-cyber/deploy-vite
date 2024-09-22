import React from 'react'

function DropDown({title, option , func}) {
  return (
    <div className='select'>

        <select onChange={func} name='format' id='format' defaultValue="0">

            <option value="0" disabled>
                {title}
            </option>
            {option.map((item,index)=>(
                <option  value={item}  key={index}>
                    {item.toUpperCase()}

                </option>
            ))}

        </select>
      
    </div>
  )
}

export default DropDown
