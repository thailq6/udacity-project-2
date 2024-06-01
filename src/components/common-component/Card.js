import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ authedEmployee, question, author, isVoted }) => {
    const isUserChoices1 = question.optionOne.votes.includes(authedEmployee.id);
    const isUserChoices2 = question.optionTwo.votes.includes(authedEmployee.id);

    const calcPercentage = (option) => {
        const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
        return totalVotes ? `${(question[option].votes.length / totalVotes * 100).toFixed(1)}%` : "0%";
    }

    return (
        <div className="card">
            <div className="card-header">
                {isVoted ? `Voted: ${question.optionOne.votes.length + question.optionTwo.votes.length}` : "New Question"}
            </div>
            <img src={author?.avatarURL || ''} className="card-img-top" alt="Author" />
            <h5 className="card-title">{question.author}</h5>
            <div className="card-body">
                {['optionOne', 'optionTwo'].map((option, idx) => (
                    <div key={idx} className={`option ${isVoted && question[option].votes.includes(authedEmployee.id) ? "selected" : ""}`}>
                        <p className="option-text">{question[option].text}</p>
                        <p className="votes-info">Votes: {question[option].votes.length} ({calcPercentage(option)})</p>
                    </div>
                ))}
                <p className="date-info">{new Date(question.timestamp).toDateString()}</p>
                <Link to={`questions/${question.id}`}>
                    <button className="btn btn-primary">{isVoted ? "Show" : "Vote"}</button>
                </Link>
            </div>
        </div>
    );
}

const mapStateToProps = ({ authedEmployee, users }) => ({
    authedEmployee,
    users,
});

export default connect(mapStateToProps)(Card);
