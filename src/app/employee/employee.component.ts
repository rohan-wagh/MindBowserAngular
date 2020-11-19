import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service/api.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

dtOptions: DataTables.Settings = {};

blocks = [
    {name: "First name",},
    {name: "Last name",},
    {name: "Date of birth",}   
]

dataSet = []

constructor(private apiService : ApiService) {
	// API call for employee list start
	this.apiService.get("employee/list").subscribe(resp=>{
		for(let item of resp.results){
			this.dataSet.push({
				firstName : item.first_name,
				lastName : item.last_name,
				date : item.date_of_birth
			})
		}
	})
	// API call for employee list end
}

ngOnInit(): void {
	this.dtOptions = {
		ordering:true,
		pagingType:'full_numbers',
	}
}



}
