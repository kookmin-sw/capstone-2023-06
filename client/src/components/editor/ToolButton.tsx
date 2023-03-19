
import { Button } from "../common/Button";

export type ToolButtonProps =  {
    icon: JSX.Element,
    commandId: string,
    value?: string | undefined
}

export const ToolButton = ({ icon, commandId, value = undefined } : ToolButtonProps) => {
    function clickEvent(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        document.execCommand(commandId, false, value);
    }

    return (
        <Button
            padding="0.25rem 0.5rem"
            onClick={clickEvent}
        >
            { icon }
        </Button>
    )
}