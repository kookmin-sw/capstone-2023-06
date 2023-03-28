import { Button } from "../../common/Button";

export type ToolButtonProps =  {
    icon: JSX.Element,
    commandId: string,
    value?: string | undefined,
    needCheck?: boolean
}

export const ToolButton = ({ icon, commandId, value = undefined, needCheck = false } : ToolButtonProps) => {
    function clickEvent(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        document.execCommand(commandId, false, value);
    }

    return (
        <Button
            padding="0.25rem 0.5rem"
            onClick={clickEvent}
            style={{
                display: 'inline-flex',
                justifyItems: 'center',
                alignItems: 'baseline',
                background: needCheck && document.queryCommandState(commandId) ? '#00ffef' : '#fff',
                padding: '4px',
                margin: '0px 4px',
            }}
        >
            { icon }
        </Button>
    )
}