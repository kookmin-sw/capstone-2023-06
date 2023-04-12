import styled from "styled-components";

export const ClickArea = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00edff0f;
`;

type ClickContainerProps = {
    onClickHandler: (e: React.MouseEvent<HTMLDivElement>) => void,
}

const ClickContainer = ({ onClickHandler } : ClickContainerProps) => {
    return (
        <ClickArea
            onClick={onClickHandler}
        >
        </ClickArea>
    )
};

export default ClickContainer;