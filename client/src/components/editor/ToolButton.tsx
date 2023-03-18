
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
        <button
            type="button"
            onClick={clickEvent}
        >
            { icon }
        </button>
    )
}