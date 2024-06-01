import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleAddQuestion } from "../../actions/questions";

const NewPoll = ({ dispatch }) => {
    const navigate = useNavigate();
    const [options, setOptions] = useState({ firstOption: "", secondOption: "" });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setOptions(prevOptions => ({ ...prevOptions, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(handleAddQuestion(options.firstOption, options.secondOption));
        navigate("/");
    };

    return (
        <div className="container">
            <h1 className="text-center">Would You Rather</h1>
            <h3 className="font-weight-light text-center">Create Your Own Poll</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ display: "flex" }}>
                    {["firstOption", "secondOption"].map((option, idx) => (
                        <div key={idx} className="form-group p-2 col-6">
                            <label htmlFor={option}>{`Option ${idx + 1}`}</label>
                            <input
                                className="form-control"
                                required
                                value={options[option]}
                                onChange={handleInputChange}
                                placeholder={`Option ${idx + 1}`}
                                type="text"
                                name={option}
                                id={option}
                            />
                        </div>
                    ))}
                </div>
                <div className="text-center p-2">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default connect()(NewPoll);
