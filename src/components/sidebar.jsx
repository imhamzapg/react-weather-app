import { use, useState } from "react"

const Sidebar = ({ setCity }) => {
    const [term, setTerm] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setCity(term)
    }

    return (
        <div className="sidebar">
            <form  onSubmit={handleSubmit} action="">
                <input onChange={(e) => { setTerm(e.target.value) }} value={term} type="text" />
            </form>
        </div>
    )
}

export default Sidebar