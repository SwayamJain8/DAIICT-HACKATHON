import React, { useState } from 'react';
import axios from 'axios';

const AIAssistant = ({ messages, onAnalysisComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [error, setError] = useState(null);

  const analyzeConversation = async () => {
    try {
      setIsAnalyzing(true);
      setError(null);
      const response = await axios.post('http://localhost:5000/api/ai/analyze', {
        messages
      });
      setAiResponse(response.data.analysis);
      if (onAnalysisComplete) {
        onAnalysisComplete(response.data.analysis);
      }
    } catch (error) {
      console.error('Error analyzing conversation:', error);
      setError(error.response?.data?.message || 'Failed to analyze conversation. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={analyzeConversation}
        disabled={isAnalyzing}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 shadow-md"
      >
        {isAnalyzing ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>Analyze Conversation</span>
          </>
        )}
      </button>
      
      {error && (
        <div className="mt-4 p-4 bg-red-500/20 text-red-200 rounded-lg border border-red-500/30">
          <h4 className="font-medium mb-2">Error:</h4>
          <p>{error}</p>
        </div>
      )}
      
      {aiResponse && (
        <div className="mt-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
          <h4 className="font-medium mb-2 text-teal-400">Analysis Results:</h4>
          <p className="text-gray-200">{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default AIAssistant; 