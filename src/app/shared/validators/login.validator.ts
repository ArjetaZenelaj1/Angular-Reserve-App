import { FormControl } from '@angular/forms';

export function ValidateOTP(control: FormControl)  {
  if (!String(control.value).startsWith('1') || String(control.value).length !== 4 ) {
    return { invalidUrl: true };
  }
  else return null;
}
