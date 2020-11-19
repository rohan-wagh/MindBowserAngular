import { Component, OnInit } from '@angular/core';
import { faTrash, faCalendarAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { ApiService } from '../api-service/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {


faCalendarAlt = faCalendarAlt;

// Forms build start
managerForm: FormGroup;
managerFormSubmitted = false;
// Forms build end

constructor(private formBuilder : FormBuilder, private apiService : ApiService, private router : Router) {
	// Manager form code start
    this.managerForm = this.formBuilder.group({
    	firstNameControl: ['', [Validators.required]],
    	LastNameControl: ['', [Validators.required]],
    	emailControl: ['', [Validators.required, Validators.email]],
	    passwordControl: ['', [Validators.required]],
	    companyControl: ['', [Validators.required]],
	    addressControl: ['', [Validators.required]],
	    dobControl: ['', [Validators.required]],
    });
    // Manager form code end
}

ngOnInit(): void {
}

// Manager form control start
get mf() { return this.managerForm.controls; }
// Manager form control end

// Manager form submit method start
    onManagerFormSubmit(){
    	this.managerFormSubmitted = true;
    	if (this.managerForm.valid){
    		let date = this.managerForm.value.dobControl
    		let data = {
    			email : this.managerForm.value.emailControl,
    			password : this.managerForm.value.passwordControl,
    			first_name : this.managerForm.value.firstNameControl,
    			last_name : this.managerForm.value.LastNameControl,
    			address : this.managerForm.value.addressControl,
    			company : this.managerForm.value.companyControl,
    			date_of_birth : date.year+"-"+date.month+"-"+date.day
    		}
    		this.apiService.post("manager", data).subscribe(resp=>{
    			if (resp.State == "Success"){
    				alert(resp.Message)
    				this.router.navigateByUrl("/login")
    			}
    			else{
    				alert(resp.Message)
    			}
    		})
    	}
    }
// Manager form submit method end

}
