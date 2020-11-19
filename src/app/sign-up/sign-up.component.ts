import { Component, OnInit } from '@angular/core';
import { faTrash, faCalendarAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { ApiService } from '../api-service/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

faCalendarAlt = faCalendarAlt;

// Forms build start
employeeForm: FormGroup;
employeeFormSubmitted = false;
// Forms build end

constructor(private formBuilder : FormBuilder, private apiService : ApiService, private router : Router) {
	// Employee form code start
    this.employeeForm = this.formBuilder.group({
    	firstNameControl: ['', [Validators.required]],
    	LastNameControl: ['', [Validators.required]],
    	emailControl: ['', [Validators.required]],
	    passwordControl: ['', [Validators.required]],
	    companyControl: ['', [Validators.required]],
	    addressControl: ['', [Validators.required]],
	    dobControl: ['', [Validators.required]],
    });
    // LogEmployeein form code end
}

ngOnInit(): void {
}

// Employee form control start
get ef() { return this.employeeForm.controls; }
//Employee form control end

// Employee form submit method start
    onEmployeeFormSubmit(){
    	this.employeeFormSubmitted = true;
    	if (this.employeeForm.valid){
    		let date = this.employeeForm.value.dobControl
    		let data = {
    			email : this.employeeForm.value.emailControl,
    			password : this.employeeForm.value.passwordControl,
    			first_name : this.employeeForm.value.firstNameControl,
    			last_name : this.employeeForm.value.LastNameControl,
    			address : this.employeeForm.value.addressControl,
    			company : this.employeeForm.value.companyControl,
    			date_of_birth : date.year+"-"+date.month+"-"+date.day
    		}
    		this.apiService.post("employee", data).subscribe(resp=>{
    			if (resp.State == "Success"){
    				alert(resp.Message)
    				this.router.navigateByUrl("/employees")
    			}
    			else{
    				alert(resp.Message)
    			}
    		})
    	}
    }
// Employee form submit method end

}
