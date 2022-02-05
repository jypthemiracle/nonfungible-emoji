import { drizzleConnect } from "@drizzle/react-plugin";
import Issue from './Issue.js'
import { emojiChangeAction } from "../../actions/customAction";

const mapStateToProps = (state) => (
    {
        emoji: state.customReducer.emoji,
        accounts: state.accounts,
        drizzleStatus: state.drizzleStatus,
        DeedToken: state.contracts.DeedToken
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        onEmojiChange: (params) => {
            dispatch(emojiChangeAction(params))
        }
    }
)

const IssueContainer = drizzleConnect(Issue, mapStateToProps, mapDispatchToProps);

export default IssueContainer;