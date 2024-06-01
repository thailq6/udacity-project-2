import { connect } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { handleAddAnswer } from '../../actions/questions';
import "../common-component/card.css";

const PollPage = ({ dispatch, authedEmployee, users, questions }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const question = questions[id];
    
    if (!authedEmployee || !question) {
        return <Navigate to="/404" />;
    }

    const author = users[question.author];
    const isVotedForOptionOne = question.optionOne.votes.includes(authedEmployee.id);
    const isVotedForOptionTwo = question.optionTwo.votes.includes(authedEmployee.id);
    const isVoted = isVotedForOptionOne || isVotedForOptionTwo;

    const handleVote = (option) => {
        dispatch(handleAddAnswer(id, option));
        navigate(`/questions/${id}`);
    };

    const calcPercentage = (option) => {
        const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
        const votes = question[option].votes.length;
        return totalVotes ? `${((votes / totalVotes) * 100).toFixed(1)} %` : '0 %';
    };

    return (
        <div className="container-fluid">
            <div className="text-center">
                <h4>Poll by {author.name}</h4>
                <img src={author.avatarURL} alt="Profile" style={{ height: '50px', width: '50px', marginTop: '10px' }} />
            </div>
            <h1 className="text-center">Would You Rather</h1>
            {['optionOne', 'optionTwo'].map((option, idx) => (
                <div key={idx} className="col-6">
                    <div className="card text-center">
                        <div className={`${isVoted && question[option].votes.includes(authedEmployee.id) ? "choice" : ""}`}>
                            <p className="font-bold mb-2">{question[option].text}</p>
                            <p>{isVoted ? "Note: This is my vote" : ""}</p>
                        </div>
                        <div className="card-body">
                            <button onClick={() => handleVote(option)} disabled={isVoted} className="btn btn-primary">
                                {!isVoted ? 'Click' : `Votes: ${question[option].votes.length} (${calcPercentage(option)})`}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

const mapStateToProps = ({ authedEmployee, users, questions }) => ({ authedEmployee, users, questions });

export default connect(mapStateToProps)(PollPage);
