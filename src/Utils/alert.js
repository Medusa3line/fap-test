import Swal from 'sweetalert2';

const swal = (title, text, type) => Swal.fire({
    type,
    title,
    text,
    timer: 5000,
    animation: false,
    confirmButtonColor: '#5C2584',
    customClass: {
        popup: 'animated shake'
    },
    // footer: 'If there is a problem, please contact FCMB support'
})
export default swal;