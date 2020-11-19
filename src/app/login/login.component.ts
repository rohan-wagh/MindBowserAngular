import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api-service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	// Forms build start
	loginForm: FormGroup;
	loginFormSubmitted = false;
	// Forms build end

	constructor(private formBuilder : FormBuilder, private apiService : ApiService, private router : Router) { 

		// Login form code start
	    this.loginForm = this.formBuilder.group({
	    	emailControl: ['', [Validators.required]],
	    	passwordControl: ['', [Validators.required]],
	    });
	    // Login form code end

	}

	ngOnInit(): void {}

	// Login form control start
    get lf() { return this.loginForm.controls; }
    // Login form control end

    // Login form submit method start
    onLoginFormSubmit(){
    	this.loginFormSubmitted = true;
    	if (this.loginForm.valid){
    		let data = {
    			email : this.loginForm.value.emailControl,
    			password : this.loginForm.value.passwordControl
    		}
    		this.apiService.post("manager/login",data).subscribe(resp=>{
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
    // Login form submit method end

}
