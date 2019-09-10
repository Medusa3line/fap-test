// Manipulate Number input fields and Password fields for Pin to not accept anything other than numbers
export const manipulateNumber = (e) => {
  var inputKeyCode = e.which;
  if ((inputKeyCode >= 46 && inputKeyCode <= 57) && (inputKeyCode != null)){
      if((e.target.value.length === e.target.maxLength) || (inputKeyCode === 45)){
      e.preventDefault();
    }
  } else {
    e.preventDefault();
  }
}

// export const formatNumber = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'NGN',
//   minimumFractionDigits: 2
// })