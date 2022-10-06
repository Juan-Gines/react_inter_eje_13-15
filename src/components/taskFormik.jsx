import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

//Models
import { Task } from '../models/task.class';
import { LEVELS } from '../models/levels.enum';

const TaskFormik = () => {
	let task = new Task();

	const initialValues = {
		name: '',
		description: '',
		completed: false,
		level: LEVELS.NORMAL,
	};

	const taskSchema = Yup.object().shape({
		name: Yup.string()
			.min(6, 'Name too short')
			.max(25, 'Name too long')
			.required('Name is required'),
		description: Yup.string()
			.min(6, 'Description too short')
			.max(50, 'Description too long')
			.required('Description is required'),
		level: Yup.string()
			.oneOf([LEVELS.BLOCKING, LEVELS.NORMAL, LEVELS.URGENT], 'Select correct level')
			.required('Level is required'),
	});

	return (
		<div>
			<h1>Task Formik</h1>
			<Formik
				//*** Initial values that the form will take */
				initialValues={initialValues}
				//*** Yup Validation Schema */
				validationSchema={taskSchema}
				//*** onSubmit Event */
				onSubmit={async (values) => {
					await new Promise((r) => setTimeout(r, 1000));
					alert(JSON.stringify(values, null, 2));
				}}
			>
				{/* We obtain props from Formik */}
				{({ values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
					<Form>
						<label htmlFor="name">Name</label>
						<Field id="name" name="name" placeholder="Task name" type="text" />
						{/* Name Errors */}
						<ErrorMessage name="name" component="div" />

						<label htmlFor="description">Description</label>
						<Field id="description" name="description" placeholder="Description Task" type="text" />
						{/* Description Errors */}
						<ErrorMessage name="description" component="div" />

						<Field as="select" name="level">
							<option value={LEVELS.NORMAL}>Normal</option>
							<option value={LEVELS.URGENT}>Urgent</option>
							<option value={LEVELS.BLOCKING}>Bloquing</option>
							<option value="testing">Testing errors</option>
						</Field>
						{/* Level Errors */}
						<ErrorMessage name="level" component="div" />
						<button type="submit">Submit</button>
						{isSubmitting ? <p>Register your Task ... </p> : null}
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default TaskFormik;
