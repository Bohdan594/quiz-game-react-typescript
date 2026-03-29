import './AnswerOption.scss';
import {decode} from 'html-entities';


function AnswerOption({answer}: {answer : string}) {

    return (
        <>  
            {
                answer &&
                <div className="answer-option">
                    <p> 
                       {decode(answer)}
                    </p>
                </div>
            }
            
        </>
    )
}

export default AnswerOption
