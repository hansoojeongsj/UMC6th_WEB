import PropTypes from 'prop-types';
import './Modal.css';

function Modal({ closeModal }) {
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <p className="modal-title">안녕하세요</p>
        <p>모달 내용은 어쩌고 저쩌고..</p>
        <div className='close-wrapper'>
          <button className="close" onClick={closeModal}>닫기</button>

        </div>
      </div>
    </>
  );
}
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default Modal;