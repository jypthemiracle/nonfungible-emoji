import { drizzleConnect } from "@drizzle/react-plugin";
import MainComponent from "./MainComponent";
import sayHelloAction from "./actions/customAction"

const mapStateToProps = (state) => (
    {
        // TODO: why not work?
        // hello: state.customReducer.sayHello,
        accounts: state.accounts,
        accountBalances: state.accountBalances,
        drizzleStatus: state.drizzleStatus,
        DeedToken: state.contracts.DeedToken
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        onClickSayHello: (params) => {
            dispatch(sayHelloAction(params))
        }
    }
)

const MainContainer = drizzleConnect(MainComponent, mapStateToProps, mapDispatchToProps);

export default MainContainer;