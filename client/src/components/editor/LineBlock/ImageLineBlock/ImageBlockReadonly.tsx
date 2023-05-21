import React from "react";
import styled from "styled-components";
import { ReferButton } from "../../common/Button";
import { POSITION, Refer } from "../../type";

import { debounce } from "lodash";
import { PrimaryButton } from "../../../common/Button";
import { IconTag } from "@tabler/icons-react";
import { generateRandomID } from "../../../../utils/randomID";

import { ReferInput } from "../../common/Input";
import { FullImage } from "../../common/Image";
import { RootState } from "../../../../modules";
import { useDispatch, useSelector } from "react-redux";
import { addRefer, checkRefers } from "../../../../modules/images";
import ProductCard from "../../../product/ProductCard";
import { ProductData } from "../../../../type/product";
import { getProduct } from "../../../../api/product";

const ImageBlockReadonly = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const images = useSelector((state: RootState) => state.images);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const fileInputRef = React.useRef<any>(null);
  // const [refers, setRefers] = React.useState<Refer[]>([]);
  const [imgRect, setImgRect] = React.useState<DOMRect>();
  const [curReferId, setCurReferId] = React.useState<string>("");

  // const [files, setFiles] = React.useState<FileList | undefined>();
  const [showImage, setShowImage] = React.useState<string>("");

  React.useEffect(() => {
    setShowImage(images[id].src);
  }, [id]);

  React.useEffect(() => {
    // 데이터 생성
    window.addEventListener("resize", handleResize);
    // dispatch(newImage(id));

    return () => {
      window.removeEventListener("resize", handleResize);
      //   dispatch(removeImage(id));
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

  const getRefers = () => {
    if (images === undefined || id === undefined || imgRef === undefined)
      return [];

    // if (images[id] === undefined) {
    //   dispatch(newImage(id));
    //   return [];
    // }

    return [...images[id].refers] || [];
  };

  function selectRefer(refer: Refer) {
    checkBeforeCurCreate();
    // e.stopPropagation();
    
    console.log(refer);

    setCurReferId(refer.id);
    initProduct(refer.data);

    setOpenProductDetail(true);
  }

  function isSelectingRefer() {
    if (curReferId === "") return false;

    const idx = images[id].refers.findIndex((r) => r.id === curReferId);
    return idx > -1;
  }

  function getReferValue() {
    const idx = images[id].refers.findIndex((r) => r.id === curReferId);
    return images[id].refers[idx].data || "";
  }

  const [product, setProduct] = React.useState<ProductData>({
    name: "",
    tags: [],
    thumbnail: "",
    subThumbnail: [],
    price: "",
    detail: "",
    content: "",
  });

  const initProduct = async (product_id: string) => {

    console.log(product_id);

    if (!product_id) return;
    try {
      const res = await getProduct(product_id);

      console.log(res);
      if (res.success) {
        setProduct({
          id: product_id,
          name: res.result.title,
          tags: res.result.hashtags,
          thumbnail: res.result.thumbnail,
          subThumbnail: res.result.subthumbnails,
          price: res.result.price,
          detail: res.result.description,
          content: res.result.content,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [openProductDetail, setOpenProductDetail] =
    React.useState<boolean>(false);

  return (
    <div style={{ position: "relative" }}>
      {showImage !== "" && <FullImage ref={imgRef} src={showImage} />}
      {showImage !== "" &&
        getRefers().map((refer, idx) => {
          return (
            <ReferButton
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
      {/* {isSelectingRefer() && (
          <>
            <ReferInput value={getReferValue()} readOnly></ReferInput>
          </>
        )} */}
      {openProductDetail && (
        <>
          <ProductCard product={product} summary />
          <ExitButton
            type="button"
            onClick={() => {
              setOpenProductDetail(false);
            }}
          >
            X
          </ExitButton>
        </>
      )}
    </div>
  );
};

export default ImageBlockReadonly;

const ExitButton = styled.button`
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
