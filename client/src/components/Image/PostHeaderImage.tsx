import styled from "styled-components";

export const PostHeaderImage = styled.div`
  height: 30rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: repeating-linear-gradient(
      -21deg,
      #bdbdbd,
      #bdbdbd 30px,
      transparent 30px,
      transparent 60px,
      #bdbdbd 60px
    ),
    repeating-linear-gradient(
      69deg,
      #bdbdbd,
      #bdbdbd 30px,
      transparent 30px,
      transparent 60px,
      #bdbdbd 60px
    ),
    repeating-linear-gradient(
      159deg,
      #bdbdbd,
      #bdbdbd 30px,
      transparent 30px,
      transparent 60px,
      #bdbdbd 60px
    ),
    repeating-linear-gradient(
      249deg,
      #bdbdbd,
      #bdbdbd 30px,
      transparent 30px,
      transparent 60px,
      #bdbdbd 60px
    );
  background-size: 3px 100%, 100% 3px, 3px 100%, 100% 3px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
  ${(props: { thumbnail?: string }) => {
    if (props.thumbnail) {
      return `
        background-image: url(${props.thumbnail});
        background-size: cover;
        background-position: center center;
        `;
    }
    return `
    background-image: repeating-linear-gradient(
        -21deg,
        #bdbdbd,
        #bdbdbd 30px,
        transparent 30px,
        transparent 60px,
        #bdbdbd 60px
    ),
    repeating-linear-gradient(
        69deg,
        #bdbdbd,
        #bdbdbd 30px,
        transparent 30px,
        transparent 60px,
        #bdbdbd 60px
    ),
    repeating-linear-gradient(
        159deg,
        #bdbdbd,
        #bdbdbd 30px,
        transparent 30px,
        transparent 60px,
        #bdbdbd 60px
    ),
    repeating-linear-gradient(
        249deg,
        #bdbdbd,
        #bdbdbd 30px,
        transparent 30px,
        transparent 60px,
        #bdbdbd 60px
    );
    background-size: 3px 100%, 100% 3px, 3px 100%, 100% 3px;
    background-position: 0 0, 0 0, 100% 0, 0 100%;
    `;
  }}
`;
