import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func,
};
PostFiltersForm.defaultProps = {
    onSubmit: null,
}
function PostFiltersForm(props) {
    const {onSubmit} = props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeoutRef = useRef(null);

    function handleSearchOnchange(e) {
        const value = e.target.value;
        setSearchTerm(value);
        if (!onSubmit) return;
        //set time out mới phải  clear time out cũ rồi đợi 300ms rồi lại clear và set time cái mới
        if (typingTimeoutRef.current){
            clearTimeout(typingTimeoutRef.current)
        };

        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value,
            };
            onSubmit(formValues);
        },300) //gán bằng giá trị current
    }

    return(
        <form>
            <input type="text" value={searchTerm} onChange={handleSearchOnchange}/>
        </form>
    );
}
export default PostFiltersForm;
