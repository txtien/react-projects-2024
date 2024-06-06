import "./index.scss";
import NotFoundImage from "../../assets/gif-not-found.gif";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="pageWrap">
      <h1 className="title">Không tìm thấy trang</h1>
      <div className="contentMain">
      <img src={NotFoundImage} alt="Not found" className="img" />
      <div className="help-text-block">
        <p className="help-text1">Có vẻ bạn đang đi lạc rồi</p>
        <p className="help-text2">Hãy quay lại trang chủ nhé</p>
      </div>
      </div>
      <Link to="/" className="backBtn">
        Quay lại trang chủ
      </Link>
    </div>
  );
};
