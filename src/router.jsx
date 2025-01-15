import { createBrowserRouter } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import Root from "./layout/Root";
import Login from "./components/auth/AuthForm";
import HomePage from "./components/HomePage";
import UserInfo from "./components/profile/UserInfo";
import UpdateUserInfo from "./components/profile/UpdateUserInfoForm";
import Stickers from "./components/stickers/Stickers";
import AddStickerForm from "./components/stickers/AddStickerForm";
import UpdateStickerForm from "./components/stickers/UpdateStickerForm";
import StickerSettings from "./components/stickers/StickerSettings";
import AddStickerSettingsForm from "./components/stickers/AddStickerSettingsForm";
import UpdateStickerSettingsForm from "./components/stickers/UpdateStickerSettingsForm";
import Events from "./components/events/Events";
import AddEventForm from "./components/events/AddEventForm";
import UpdateEventForm from "./components/events/UpdateEventForm";
import ToDoLists from "./components/lists/ToDoLists";
import AddToDoListForm from "./components/lists/AddToDoListForm";
import UpdateToDoListForm from "./components/lists/UpdateToDoListForm";
import ShoppingLists from "./components/lists/ShoppingLists";
import AddShoppingListForm from "./components/lists/AddShoppingListForm";
import UpdateShoppingListForm from "./components/lists/UpdateShoppingListForm";
import Journals from "./components/journals/Journals";
import AddJournalForm from "./components/journals/AddJournalForm";
import UpdateJournalForm from "./components/journals/UpdateJournalForm";
import PersonalPasswords from "./components/passwords/PersonalPasswords";
import AddPersonalPassword from "./components/passwords/AddPersonalPasswordForm";
import UpdatePersonalPassword from "./components/passwords/UpdatePersonalPasswordForm";
import GroceryLists from "./components/meals/GroceryLists";
import AddGroceryListForm from "./components/meals/AddGroceryListForm";
import UpdateGroceryListForm from "./components/meals/UpdateGroceryListForm";
import Meals from "./components/meals/Meals";
import AddMealForm from "./components/meals/AddMealForm";
import UpdateMealForm from "./components/meals/UpdateMealForm";
import BudgetEntries from "./components/money/BudgetEntries";
import AddBudgetEntryForm from "./components/money/AddBudgetEntryForm";
import UpdateBudgetEntryForm from "./components/money/UpdateBudgetEntryForm";
import SpendingEntries from "./components/money/SpendingEntries";
import AddSpendingEntryForm from "./components/money/AddSpendingEntryForm";
import UpdateSpendingEntryForm from "./components/money/UpdateSpendingEntryForm";
import MedicalInfo from "./components/medical/MedicalInfo";
import AddMedicalInfoForm from "./components/medical/AddMedicalInfoForm";
import UpdateMedicalInfoForm from "./components/medical/UpdateMedicalEntryForm";
import Habits from "./components/habits/Habits";
import AddHabitForm from "./components/habits/AddHabitForm";
import UpdateHabitForm from "./components/habits/UpdateHabitForm";
import Cleaning from "./components/habits/Cleaning";
import AddCleaningEntryForm from "./components/habits/AddCleaningEntryForm";
import UpdateCleaningEntryFrom from "./components/habits/UpdateCleaningEntryForm";
import SubPlans from "./components/plans/SubPlans";
import AddSubPlanForm from "./components/plans/AddSubPlanForm";
import UpdateSubPlanForm from "./components/plans/UpdateSubPlanForm";
import WeeklyLessonPlans from "./components/plans/WeeklyLessonPlans";
import AddWeeklyLessonPlanForm from "./components/plans/AddWeeklyLessonPlanForm";
import UpdateWeeklyLessonPlanForm from "./components/plans/UpdateWeeklyLessonPlanForm";
import DailyLessonPlans from "./components/plans/DailyLessonPlans";
import AddDailyLessonPlanForm from "./components/plans/AddDailyLessonPlanForm";
import UpdateDailyLessonPlanForm from "./components/plans/UpdateDailyLessonPlanForm";
import SeatingCharts from "./components/students/SeatingCharts";
import AddSeatingChartForm from "./components/students/AddSeatingChartForm";
import UpdateSeatingChartForm from "./components/students/UpdateSeatingChartForm";
import Jobs from "./components/students/Jobs";
import AddJobForm from "./components/students/AddJobForm";
import UpdateJobForm from "./components/students/UpdateJobForm";
import SchoolPasswords from "./components/passwords/SchoolPasswords";
import AddSchoolPasswordForm from "./components/passwords/AddSchoolPasswordForm";
import UpdateSchoolPasswordForm from "./components/passwords/UpdateSchoolPasswordForm";
import ClassRewards from "./components/students/ClassRewards";
import AddClassRewardForm from "./components/students/AddClassRewardForm";
import UpdateClassRewardForm from "./components/students/UpdateClassRewardForm";
import IEP from "./components/students/IEP";
import AddIEPForm from "./components/students/AddIEPForm";
import UpdateIEPForm from "./components/students/UpdateIEPForm";
import Grades from "./components/students/Grades";
import AddGradeForm from "./components/students/AddGradeForm";
import UpdateGradeForm from "./components/students/UpdateGradeForm";
import StudentTransportations from "./components/students/StudentTransportationInfo";
import AddStudentTransportationForm from "./components/students/AddStudentTransportationInfoForm";
import UpdateStudentTransportationForm from "./components/students/UpdateStudentTransportationForm";
import Rosters from "./components/students/Rosters";
import AddRosterForm from "./components/students/AddRosterForm";
import UpdateRosterForm from "./components/students/UpdateRosterForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/auth", element: <AuthForm /> },
      { path: "/login", element: <Login /> },
      { path: "/UserInfo", element: <UserInfo /> },
      { path: "/UpdateUserInfo", element: <UpdateUserInfo /> },
      { path: "/Stickers", element: <Stickers /> },
      { path: "/AddStickerForm", element: <AddStickerForm /> },
      { path: "/UpdateStickerForm", element: <UpdateStickerForm /> },
      { path: "/StickerSettings", element: <StickerSettings /> },
      { path: "/AddStickerSettingsForm", element: <AddStickerSettingsForm /> },
      {
        path: "/UpdateStickerSettingsForm",
        element: <UpdateStickerSettingsForm />,
      },
      { path: "/events", element: <Events /> },
      { path: "/AddEventForm", element: <AddEventForm /> },
      { path: "/UpdateEventForm", element: <UpdateEventForm /> },
      { path: "/ToDoLists", element: <ToDoLists /> },
      { path: "/AddToDoListForm", element: <AddToDoListForm /> },
      { path: "/UpdateToDoListForm", element: <UpdateToDoListForm /> },
      { path: "/ShoppingLists", element: <ShoppingLists /> },
      { path: "/AddShoppingListForm", element: <AddShoppingListForm /> },
      { path: "/UpdateShoppingListForm", element: <UpdateShoppingListForm /> },
      { path: "/Journals", element: <Journals /> },
      { path: "/AddJournalForm", element: <AddJournalForm /> },
      { path: "/UpdateJournalForm", element: <UpdateJournalForm /> },
      { path: "/PersonalPasswords", element: <PersonalPasswords /> },
      { path: "/AddPersonalPassword", element: <AddPersonalPassword /> },
      { path: "/UpdatePersonalPassword", element: <UpdatePersonalPassword /> },
      { path: "/GroceryLists", element: <GroceryLists /> },
      { path: "/AddGroceryListForm", element: <AddGroceryListForm /> },
      { path: "/UpdateGroceryListForm", element: <UpdateGroceryListForm /> },
      { path: "/Meals", element: <Meals /> },
      { path: "/AddMealForm", element: <AddMealForm /> },
      { path: "/UpdateMealForm", element: <UpdateMealForm /> },
      { path: "/BudgetEntries", element: <BudgetEntries /> },
      { path: "/AddBudgetEntryForm", element: <AddBudgetEntryForm /> },
      { path: "/UpdateBudgetEntryForm", element: <UpdateBudgetEntryForm /> },
      { path: "/SpendingEntries", element: <SpendingEntries /> },
      { path: "/AddSpendingEntryForm", element: <AddSpendingEntryForm /> },
      { path: "/UpdateSpendingEntry", element: <UpdateSpendingEntryForm /> },
      { path: "/MedicalInfo", element: <MedicalInfo /> },
      { path: "/AddMedicalInfoForm", element: <AddMedicalInfoForm /> },
      { path: "/UpdateMedicalInfoForm", element: <UpdateMedicalInfoForm /> },
      { path: "/Habits", element: <Habits /> },
      { path: "/AddHabitForm", element: <AddHabitForm /> },
      { path: "/UpdateHabitForm", element: <UpdateHabitForm /> },
      { path: "/Cleaning", element: <Cleaning /> },
      { path: "/AddCleaningEntryForm", element: <AddCleaningEntryForm /> },
      {
        path: "/UpdateCleaningEntryForm",
        element: <UpdateCleaningEntryFrom />,
      },
      { path: "/SubPlans", element: <SubPlans /> },
      { path: "/AddSubPlan", element: <AddSubPlanForm /> },
      { path: "/UpdateSubPlanForm", element: <UpdateSubPlanForm /> },
      { path: "/WeeklyLessonPlans", element: <WeeklyLessonPlans /> },
      {
        path: "/AddWeeklyLessonPlanForm",
        element: <AddWeeklyLessonPlanForm />,
      },
      {
        path: "/UpdateWeeklyLessonPlanForm",
        element: <UpdateWeeklyLessonPlanForm />,
      },
      { path: "/DailyLessonPlans", element: <DailyLessonPlans /> },
      { path: "/AddDailyLessonPlanForm", element: <AddDailyLessonPlanForm /> },
      {
        path: "/UpdateDailyLessonPlanForm",
        element: <UpdateDailyLessonPlanForm />,
      },
      { path: "/SeatingCharts", element: <SeatingCharts /> },
      { path: "/AddSeatingChartForm", element: <AddSeatingChartForm /> },
      { path: "/UpdateSeatingChartForm", element: <UpdateSeatingChartForm /> },
      { path: "/Jobs", element: <Jobs /> },
      { path: "/AddJobForm", element: <AddJobForm /> },
      { path: "/UpdateJobForm", element: <UpdateJobForm /> },
      { path: "/SchoolPasswords", element: <SchoolPasswords /> },
      { path: "/AddSchoolPasswordForm", element: <AddSchoolPasswordForm /> },
      {
        path: "/UpdateSchoolPasswordForm",
        element: <UpdateSchoolPasswordForm />,
      },
      { path: "/ClassRewards", element: <ClassRewards /> },
      { path: "/AddClassRewardForm", element: <AddClassRewardForm /> },
      { path: "/UpdateClassRewardForm", element: <UpdateClassRewardForm /> },
      { path: "/IEP", element: <IEP /> },
      { path: "AddIEPForm", element: <AddIEPForm /> },
      { path: "/UpdateIEPForm", element: <UpdateIEPForm /> },
      { path: "/Grades", element: <Grades /> },
      { path: "/AddGradeForm", element: <AddGradeForm /> },
      { path: "/UpdateGradeForm", element: <UpdateGradeForm /> },
      { path: "/StudentTransportations", element: <StudentTransportations /> },
      {
        path: "/AddStudentTransportationForm",
        element: <AddStudentTransportationForm />,
      },
      {
        path: "/UpdateStudentTransportationForm",
        element: <UpdateStudentTransportationForm />,
      },
      { path: "/rosters", element: <Rosters /> },
      { path: "/AddRosterForm", element: <AddRosterForm /> },
      { path: "/UpdateRosterForm", element: <UpdateRosterForm /> },
    ],
  },
]);

export default router;
