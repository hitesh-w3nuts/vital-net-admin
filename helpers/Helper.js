import cookies from "js-cookie";


const getToken = () => {
	return cookies.get("vit_admin_token") || null;
};

const getUserDetail = () => {
	if(cookies.get("vit_admin_user_detail")){
		return JSON.parse(cookies.get("vit_admin_user_detail"));
	}else{
		return ;
	}
};
const getFullUserDetail = () => {
	if(cookies.get("vit_admin_user_detail")){
		return cookies.get("vit_admin_user_detail")
	}else{
		return ;
	}
	
}

const getUserId = () => {
	return cookies.get("vit_admin_user_detail") ? JSON.parse(cookies.get("vit_admin_user_detail"))["user_id"] : 0;
};

const getUserType = () => {
	if (cookies.get("vit_admin_user_detail")) {
		return JSON.parse(cookies.get("vit_admin_user_detail"))["user_role"];
	} else {
		return 0;
	}
};

const removeUserSession = () => {
	cookies.remove("vit_admin_token");
	cookies.remove("user_detail");
};

const setUserSession = (token, user) => {
	cookies.set("vit_admin_token", token, { expires: 365 * 24 });
	cookies.set("vit_admin_user_detail", JSON.stringify(user), { expires: 365 * 24 });
};

const updateUserDetailSession = ( user)  => {
	cookies.set("vit_admin_user_detail", JSON.stringify(user), { expires: 365 * 24 });
};

const is_login = () => {
	if (cookies.get("vit_admin_token")) {
		return true;
	} else {
		return false;
	}
};

const img_view = (img, width = "", height = "") => {
	return process.env.REACT_APP_IMG_URL + "img?img=" + img + "&w=" + width + "&h=" + height;
};

const resizeBase64Img = (base64Str, maxWidth = 400, maxHeight = 350) => {
	return new Promise((resolve) => {
		let img = new Image();
		img.src = base64Str;
		img.onload = () => {
			let canvas = document.createElement("canvas");
			const MAX_WIDTH = maxWidth;
			const MAX_HEIGHT = maxHeight;
			let width = img.width;
			let height = img.height;

			if (width > height) {
				if (width > MAX_WIDTH) {
					height *= MAX_WIDTH / width;
					width = MAX_WIDTH;
				}
			} else {
				if (height > MAX_HEIGHT) {
					width *= MAX_HEIGHT / height;
					height = MAX_HEIGHT;
				}
			}
			canvas.width = width;
			canvas.height = height;
			let ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, width, height);
			resolve(canvas.toDataURL());
		};
	});
};

const arrayColumn = (column_array, column, key = false) => {
	const arrayColumn = (arr, n) => arr.map((x) => x[n]);
	return arrayColumn(column_array, column);
};

const getImageSizeData = (url) => {
    const img = new Image();
    let height =0, width = 0; 
    img.onload = function() {
        height = img.height;
        width = img.width;
    }
    img.src = url;
    return {"width": width, "height": height}
}

const add_email_screen = (questions) => {
	const newQuestions = [];
	// newQuestions.push({questionType: "info-with-image", _id: "1212"});
	// newQuestions.push({questionType: "important-address", _id: "1412"});
	for (let index = 0; index < questions.length; index++) {
		const question = questions[index];
		if(!is_login() && question.questionType == 'info' && question.questionCategory.name === "Home"){
			newQuestions.push({question: "May we write down your email address?", questionType: "email-screen", questionOptions: "It is not mandatory, however we would like to save your preferences and contact you if we find a Vital area that matches your needs and wishes!"})
		}
		newQuestions.push(question)
	}

	if(!is_login()){
		newQuestions.push({questionType: "registration", _id: "1234"});
	}
	newQuestions.push({questionType: "thankyou", _id: "1234"});
	
	return {"questions":newQuestions, "questionsCount": newQuestions.length};
}

const set_question_return_url = (url, screen = -1) => {
	if (window.localStorage !== undefined) {
		const data = {
			url,
			screen
		}
		localStorage.setItem('question_return_screen', JSON.stringify(data));
	}
}

const on_login_save_user_preferences = async (post, url) => {
	if (window.localStorage !== undefined) {
        let data = window.localStorage.getItem('surveyData');
		if(data !== undefined && data !== null){
			const dataJson = JSON.parse(data);
			const questionIds = Object.keys(dataJson);
			for (let index = 0; index < questionIds.length; index++) {
				const questionId = questionIds[index];
				const options = dataJson[questionId];
				try{
					const ansInputs = {
						questionID: questionId,
						answer: options,
					};
					await post(url,ansInputs);
				}catch(error){
					console.log(error)
				}
			}
		}
	}
}

const getFormattedDate = (date) => {
	let dateText = date;

	const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
	];

	const dateObj = new Date(date);
	dateText = dateObj.getDate().toString().padStart(2, "0")+' '+monthNames[dateObj.getMonth()]+' '+dateObj.getFullYear()+' • '+dateObj.getHours().toString().padStart(2, "0")+':'+dateObj.getMinutes().toString().padStart(2, "0");
	return dateText;
}

export {
	arrayColumn,
	resizeBase64Img,
	img_view,
	getUserType,
	getToken,
	removeUserSession,
	setUserSession,
	is_login,
	getUserDetail,
	getUserId,
	getImageSizeData,
	add_email_screen,
	set_question_return_url,
	on_login_save_user_preferences,
	getFullUserDetail,
	updateUserDetailSession,
	getFormattedDate,
};
