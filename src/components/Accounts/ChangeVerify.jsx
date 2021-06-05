import { useContext } from "react";
import { AccountsContext } from "../../lib/context";
import { approveAccount } from "../../lib/firebase";

const ChangeVerify = ({ account }) => {
    const { changeApprovedStatus } = useContext(AccountsContext);
    const { id, verified } = account;

    const onClick = async () => {
        const user = await approveAccount(account.email);
        console.log(user);
        changeApprovedStatus(id, verified);
    }

    return verified ? (<></>) : (
        <button className='p-2 bg-gray-200' onClick={() => onClick()}>
            Approve
        </button>
    )
}

export default ChangeVerify;