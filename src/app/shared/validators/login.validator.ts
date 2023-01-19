import { FormControl } from '@angular/forms';

export function ValidateOTP(control: FormControl)  {
  console.log(!String(control.value).startsWith('1') || String(control.value).length !== 4  )
  if (!String(control.value).startsWith('1') || String(control.value).length !== 4 ) {
    return { invalidUrl: true };
  }
  else return null;
}
