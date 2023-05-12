import { Link } from "react-router-dom";
import { PrimaryButton } from "../components/common/Button";
import { MainLayout } from "../components/layout/Layout"
import styled from "styled-components";

const Error = () => {

    return (
        <MainLayout>
            <ErrorContainer>
                <h1>404</h1>
                <p>요청하신 페이지를 찾을 수 없습니다 !</p>
                <Link to="/">
                    <PrimaryButton >
                        홈페이지로
                    </PrimaryButton>
                </Link>
            </ErrorContainer>
        </MainLayout>
    )
}

export default Error;

const ErrorContainer = styled.div`
    text-align: center;
    padding: 20rem 0rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;