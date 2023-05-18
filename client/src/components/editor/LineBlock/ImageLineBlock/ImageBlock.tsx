import React from "react";
import styled from "styled-components";
import { ReferButton } from "../../common/Button";
import { POSITION, Refer } from "../../type";

import { debounce } from "lodash";
import { PrimaryButton } from "../../../common/Button";
import { IconTag, IconTrash } from "@tabler/icons-react";
import { generateRandomID } from "../../../../utils/randomID";

import { RemoveButton, ModeButton } from "../../common/Button";
import { ReferInput } from "../../common/Input";
import { FullImage } from "../../common/Image";
import ClickContainer from "./ClickContainer";
import { RootState } from "../../../../modules";
import { useDispatch, useSelector } from "react-redux";
import {
  addRefer,
  checkRefers,
  newImage,
  removeImage,
  removeRefer,
  srcImage,
  updateRefers,
} from "../../../../modules/images";
import { uploadImage } from "../../../../api/upload";
import ProductCard, { ProductType } from "./ProductCard";
import { getProduct, productSearch } from "../../../../api/product";

const ImageBlock = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const images = useSelector((state: RootState) => state.images);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const fileInputRef = React.useRef<any>(null);
  const [isEditMode, setEditMode] = React.useState<boolean>(false);
  // const [refers, setRefers] = React.useState<Refer[]>([]);
  const [imgRect, setImgRect] = React.useState<DOMRect>();
  const [curReferId, setCurReferId] = React.useState<string>("");

  const [searchProduct, setSearchProduct] = React.useState<string>("");

  const [searchList, setSearchList] = React.useState<ProductType[]>([]);

  React.useEffect(() => {
    // 데이터 생성
    window.addEventListener("resize", handleResize);
    dispatch(newImage(id));

    return () => {
      window.removeEventListener("resize", handleResize);
      dispatch(removeImage(id));
    };
  }, [imgRef]);

  React.useEffect(() => {
    fileInputRef.current?.click();
  }, [fileInputRef]);

  const handleResize = debounce(() => {
    const curRect = imgRef.current?.getBoundingClientRect();

    if (imgRect === curRect?.width) return;

    setImgRect(curRect);
  }, 100);

  function getPos(pos: POSITION) {
    if (imgRect === undefined) {
      handleResize();
    }

    return {
      posX: pos.posX * (imgRect?.width || 0) - 12,
      posY: pos.posY * (imgRect?.height || 0) - 12,
    };
  }

  function checkBeforeCurCreate() {
    dispatch(checkRefers(id, curReferId));
  }

  function onClickHandler(e: React.MouseEvent<HTMLDivElement>) {
    checkBeforeCurCreate();

    // 기존 Rect를 담은 imgRect 보다 클릭할때마다 새로 가져오는 것이 더 정확함(스크롤 등의 변화가 있기 때문)
    const curRect = imgRef.current?.getBoundingClientRect();

    if (curRect === undefined) return;

    // 이미지 기준으롤 얼마나 떨어져 있는 부분에 클릭했는지 확인
    const clickPos: POSITION = {
      posX: e.clientX - curRect.x,
      posY: e.clientY - curRect.y,
    };

    // 퍼센테이지 계산
    clickPos.posX /= curRect.width;
    clickPos.posY /= curRect.height;

    clickPos.posX = Math.round((clickPos.posX + Number.EPSILON) * 100) / 100;
    clickPos.posY = Math.round((clickPos.posY + Number.EPSILON) * 100) / 100;

    const refer_id = generateRandomID();
    dispatch(addRefer(id, refer_id, clickPos));

    setCurReferId(refer_id);
  }

  const getRefers = () => {
    if (images === undefined || id === undefined || imgRef === undefined)
      return [];

    if (images[id] === undefined) {
      dispatch(newImage(id));
      return [];
    }
    return images[id].refers || [];
  };

  function selectRefer(refer: Refer) {
    checkBeforeCurCreate();
    setCurReferId(refer.id);
    setSearchProduct("");
    setSearchList([]);

    if (refer.data && !isEditMode) getReferProduct(refer.data);
  }

  function isSelectingRefer() {
    if (curReferId === "") return false;

    const idx = images[id].refers.findIndex((r) => r.id === curReferId);

    return idx > -1;
  }

  function deleteRefer() {
    if (curReferId === "") return;

    dispatch(removeRefer(id, curReferId));
  }

  function getReferValue() {
    const idx = images[id].refers.findIndex((r) => r.id === curReferId);
    return images[id].refers[idx].data || "";
  }

  function getCurRefer() {
    const idx = images[id].refers.findIndex((r) => r.id === curReferId);
    return images[id].refers[idx];
  }

  // const [files, setFiles] = React.useState<FileList | undefined>();
  const [showImage, setShowImage] = React.useState<string>("");

  const handleAddImages = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageLists = event.target.files;

    if (imageLists == null || imageLists.length !== 1) {
      // 이미지 입력 안했음. 잘못된 행동
      fileInputRef.current.click();
      return;
    }

    setShowImage(URL.createObjectURL(imageLists[0]));

    // 이미지 업로드
    try {
      const formData = new FormData();
      formData.append("image", imageLists[0]);

      const res = await uploadImage(formData);

      if (res.success) {
        dispatch(srcImage(id, res.result.url));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [curReferProduct, setCurReferProduct] = React.useState<ProductType>();
  const getReferProduct = async (data: string) => {
    try {
      const res = await getProduct(data);

      if (res.success) {
        setCurReferProduct(res.result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const selectProductHandler = (product_id: string) => {
    const idx = getRefers().findIndex((r) => r.id === curReferId);
    if (idx > -1) {
      getRefers()[idx].data = product_id;
      dispatch(updateRefers(id, getRefers()));
      // refers[idx].data = e.target.value;
      // setRefers([...refers]);ㅁ
      // setOpenModal(false);
      setCurReferId("");
    }
  };

  const debouncedSearch = React.useMemo(
    () =>
      debounce(async (query) => {
        try {
          const res = await productSearch(query);
          if (res.success) {
            // 만약 0개일때는 이전 기록으로 남기기 . '데스커' 타이핑 중 '데슼'같은 경우를 매번 새로고침하지 않기 위해
            if (res.result.length > 0) setSearchList(res.result);
          }
        } catch (err) {
          console.error(err);
        }
      }, 500),
    [searchProduct]
  );

  const searchProductHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        ref={fileInputRef}
        type="file"
        name="userfile"
        onChange={handleAddImages}
        style={{ display: "none" }}
      />
      {showImage !== "" && <FullImage ref={imgRef} src={showImage} />}
      {isEditMode && showImage !== "" && (
        <ClickContainer onClickHandler={onClickHandler}></ClickContainer>
      )}
      {showImage !== "" &&
        getRefers().map((refer, idx) => {
          return (
            <ReferButton
              type="button"
              onClick={() => {
                selectRefer(refer);
              }}
              key={idx}
              {...getPos(refer)}
            >
              <IconTag />
            </ReferButton>
          );
        })}
      {(isSelectingRefer() && isEditMode) ? (
        <SearchModal {...getPos(getCurRefer())}>
          <SearchHeader>
            <ReferInput
            onPaste={(e:any)=>{ console.log('23232'); e.stopPropagation();}}
              value={searchProduct}
              onChange={searchProductHandler}
            ></ReferInput>
            <RemoveButton
              onClick={() => {
                deleteRefer();
              }}
            >
              <IconTrash />
            </RemoveButton>
          </SearchHeader>
          <SearchBody>
            {searchList.map((p) => (
              <ProductCard {...p} onClick={() => selectProductHandler(p.id)} />
            ))}
          </SearchBody>
        </SearchModal>
      ) : (
        curReferProduct && (
          <ProductModal {...getPos(getCurRefer())}>
            <ProductCard {...curReferProduct} />
            <ProductModalClose
              type="button"
              onClick={(e: any) => {
                e.preventDefault();
                setCurReferProduct(undefined);
              }}
            >
              X
            </ProductModalClose>
          </ProductModal>
        )
      )}
      <ModeButton
        type="button"
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
        }}
        onClick={() => {
          setEditMode(!isEditMode);
        }}
      >
        {isEditMode ? "완료" : "편집 모드"}
      </ModeButton>
    </div>
  );
};

export default ImageBlock;

const SearchModal = styled.div`
  background-color: white;
  position: absolute;
  width: 100px;
  height: 100px;
  transform: translateX(-50%);
  top: ${(props: POSITION) => props.posY + 30}px;
  left: ${(props: POSITION) => props.posX}px;
  display: flex;
  flex-direction: column;
  width: 375px;
  height: 450px;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.48);
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.48);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.48);
`;

const SearchHeader = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
`;
const SearchBody = styled.div`
  padding: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ProductModal = styled(SearchModal)`
  width: 359px;
  height: auto;
  padding: 1rem;
`;

const ProductModalClose = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;

  background-color: #f8f2e2;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  position: absolute;
  z-index: 2;
  transform: translate(0px, -50%);
  top: 50%;
  right: -1.25rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2rem;
  border: 1px solid #d9d9d9;
`;
// const ProductBody = styled.di
