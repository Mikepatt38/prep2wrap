import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import TutorialIllustration from '../img/illustrations/tutorial.svg'
import JobsEmptyState from '../img/tutorials/jobs-empty-state.png'
import CreateJob from '../img/tutorials/create-job.png'
import AssignUsers from '../img/tutorials/assign-users.png'
import JobsTable from '../img/tutorials/jobs-table.png'
import Crew from '../img/tutorials/crew.png'
import Availability from '../img/tutorials/availability.png'

class Tutorial extends Component {
  state = {
    tutorialPage: 0
  }

  renderTutorialStep(){
    switch(this.state.tutorialPage){
      case 0:
        return <TutorialPageStep1 nextStep={this.nextStep} />
      case 1:
        return <TutorialPageStep2 nextStep={this.nextStep} prevStep={this.prevStep} />
      case 2:
        return <TutorialPageStep3 nextStep={this.nextStep} prevStep={this.prevStep} />
      case 3:
          return <TutorialPageStep4 nextStep={this.nextStep} prevStep={this.prevStep} />
      case 4:
          return <TutorialPageStep5 nextStep={this.nextStep} prevStep={this.prevStep} />
    }
  }

  prevStep = () => {
    window.scrollTo(0, 0)
    this.setState({
      tutorialPage: this.state.tutorialPage - 1
    })
  }

  nextStep = () => {
    window.scrollTo(0, 0)
    this.setState({
      tutorialPage: this.state.tutorialPage + 1
    })
  }

  render(){
    return (
      <div className="app-page">
        <div className="workspace">
          <div className="workspace-desktop">
            <div className="workspace-tab-list">
              <Link to="/" className="link">Dashboard</Link>
              <Link to="/availability" className="link">Availability</Link>
              <Link to="/jobs" className="link">Jobs</Link>
              <Link to="/crew" className="link">Crew</Link>
              <Link to="/account-settings" className="link">Settings</Link>
            </div>
            <Link to="/" className="button button-workspace" >I got it, skip tutorial.</Link>
          </div>
        </div>

        <div className="app-page-body">
          <div className="app-page-section">
            {this.renderTutorialStep()}
          </div>
        </div>
      </div>
    )
  }
}

function TutorialPageStep1(props){
  return (
    <div className="tutorial">
      <div className="tutorial-header">
        <img src={TutorialIllustration} alt="Tutorial Page Illustration" />
        <h1>Get Started With Prep2Wrap</h1>
      </div>
      <div className="tutorial-body">
        <p>The Prep2Wrap platform helps Costume Community connect, find, and hire their crew in the entertainment industry for music, tv, film and/or commercial jobs simpler.</p>
        <p>This allows Costume Community to easily update their availability for being hired or contacted for job openings. Connect and find other Costume Community to work with or potentially hire for their own created jobs. Create jobs and hire professionals in their area without phone tag, wondering if they are available or validating their work experience. No more trying to remember how to contact your favorite crew members to work with, easily add other users to your quick crew and easily contact/ hire them for jobs.</p>
        <p>Prep2Wrap looks to end the phone tag - hiring chasing game of the costume designer's industry and bring all the task needed to smoothly run your crew to one platform, created just for the specified needs of the industry.</p>
      </div>
      <div className="button-wrapper">
        <button onClick={() => props.nextStep()} className="button button-primary">Start Lessons</button>
      </div>
    </div>
  )
}

function TutorialPageStep2(props){
  return (
    <div className="tutorial">
      <div className="tutorial-header">
        <img src={TutorialIllustration} alt="Tutorial Page Illustration" />
        <h1>Get Started With Using Jobs</h1>
      </div>
      <div className="tutorial-body">
        <p>Using the platform, you can create custom jobs by detailing certain qualifications and search through users that match your criteria to send them an invite right to their phone! There is no more phone tag about availability, job fit, or general questions. Send a job and have the crew member review it and accept or deny in record time.</p>

        <img src={JobsEmptyState} alt="Jobs page without data" />
        <p>When navigating to the jobs section upon the first time you will see the screen as shown above. You currently have no created, accepted, completed, or pending jobs. Until you do, this is the screen you will see. To create a job, click the "Create New Job" button in the top right corner.</p>

        <img src={CreateJob} alt="Create a job page" />
        <p>To create a job, fill out the form to let the platform know what type of crew member you are looking to hire for the job.</p>

        <img src={AssignUsers} alt="Assign users" />
        <p>Once you submit the job creation form, the users that match your qualifications will be returned in a table. You are able to view the job positions that you need are wanting to hire for, positions that have not been filled are grayed out while positions that have been assigned are colored in the Prep2Wrap purple. Once you have assigned all the positions you need, you can send the job invites instantly. The invited crew member will receive an alert to their phone instantly!</p>
        <p>If no users match your job qualifications you will be presented with a message stating there were no users that matched your job criteria and directed to re-submit the form with new qualifications.</p>

        <img src={JobsTable} alt="Jobs table" />
        <p>Once your job is created you will be directed back to your jobs page with data in your table for the created job. Once you have created, completed, pending, and accepted jobs in the table you will see the different job status. Below is a quick overview of each job status and what the action allows you to do:</p>
        <ul>
          <li>Pending: This is an active job but the job has not yet started.</li>
          <li>Review: This is a job you were invited to, it is waiting for you to accept or deny the invitation. You are able to view the job before making your decision.</li>
          <li>Completed: This job has been marked as completed by the job creator.</li>
        </ul>
        <p>As a job creator, you are able to view, complete or delete your jobs at any time and your crew will all be notified immediately. As a crew member of a job you are able to view the job details or contact the job creator at any time.</p>
      </div>
      <div className="button-wrapper">
        <button onClick={() => props.prevStep()} className="button button-quit">Previous Lesson</button>
        <button onClick={() => props.nextStep()} className="button button-primary">Next Lesson</button>
      </div>
    </div>
  )
}

function TutorialPageStep3(props){
  return (
    <div className="tutorial">
      <div className="tutorial-header">
        <img src={TutorialIllustration} alt="Tutorial Page Illustration" />
        <h1>Get Started With Using Crew</h1>
      </div>
      <div className="tutorial-body">
        <p>Using the platform, you can search for other crew members on the app and add them to your quick crew so you can easily contact/ network with other professionals you work with regularly.</p>

        <img src={Crew} alt="Crew page" />
        <p>Using the platform, you are able to search for users and add them to your quick crew. This table will show at the top of your crew page once you have crew members added to it. This allows you to easily keep in touch with other professionals that you regularly work/ connect with.</p>
        <p>When searching for a user, you are able to do a name or location search. You can do both if you'd like, but atleast one must be used as a main source for your search. You are then able to refine your search by searching for specific positions or job types within your name/ location searches.</p>
      </div>
      <div className="button-wrapper">
        <button onClick={() => props.prevStep()} className="button button-quit">Previous Lesson</button>
        <button onClick={() => props.nextStep()} className="button button-primary">Next Lesson</button>
      </div>
    </div>
  )
}

function TutorialPageStep4(props){
  return (
    <div className="tutorial">
      <div className="tutorial-header">
        <img src={TutorialIllustration} alt="Tutorial Page Illustration" />
        <h1>Get Started With Using Availability</h1>
      </div>
      <div className="tutorial-body">
        <p>No longer fret over getting invited to jobs when you are already busy or wonder how everyone will know when you are or are not available.</p>
        <img src={Availability} alt="Availability page" />
        <p>Using the platform, you can update your availability with your hectic schedule to make sure you are not invited to jobs that don't align with your personal schedule. Your jobs created/ accepted through the platform will automatically be blocked out on your calendar! Below the calendar is an easy to scan list view of all your unavailable dates.</p>
        <p>All green job dates are unavailable dates due to a job already being assigned through the platform, blue are personal days that you have marked as unavailable.</p>
      </div>
      <div className="button-wrapper">
        <button onClick={() => props.prevStep()} className="button button-quit">Previous Lesson</button>
        <button onClick={() => props.nextStep()} className="button button-primary">Next Lesson</button>
      </div>
    </div>
  )
}

function TutorialPageStep5(props){
  return (
    <div className="tutorial">
      <div className="tutorial-header">
        <img src={TutorialIllustration} alt="Tutorial Page Illustration" />
        <h1>Get Started With Using Account Settings</h1>
      </div>
      <div className="tutorial-body">
        <p>You are able to keep a fully updated profile and settings through the platform. This way, you are always shown for jobs that you are qualified for.</p>
        <p>Make sure to fill out your profile information as soon as you create your account. You will not show up in user or job search results until your profile information is complete.</p>
      </div>
      <div className="button-wrapper">
        <button onClick={() => props.prevStep()} className="button button-quit">Previous Lesson</button>
        <Link to="/" className="button button-primary">Head to Dashboard</Link>
      </div>
    </div>
  )
}

export default Tutorial