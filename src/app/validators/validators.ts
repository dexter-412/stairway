import {FormControl} from "@angular/forms";


export  function checkForYear(control: FormControl): object {
  if (!parseFloat(control.value) || control.value.length !== 4 || parseFloat(control.value) > new Date().getFullYear()) {
    return {
      'hasError': true
    };
  }
  return null;
}

export  function checkForNumber(control: FormControl): object {
  if (!parseFloat(control.value)) {
    return {
      'hasError': true
    };
  }
  return null;
}
