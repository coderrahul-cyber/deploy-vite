import PropTypes from "prop-types"

DropDown.propTypes= {
    title : PropTypes.string ,
    option : PropTypes.array || PropTypes.object,
    func : PropTypes.any
}
function DropDown({title, option , func}) {
  return (
    <div className='select text-sm '>

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
