import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { FundraisingCampaign, UserRole } from '../types';
import Card from '../components/Card';
import Modal from '../components/Modal';

const Fundraising: React.FC = () => {
  const { user } = useAuth();
  const { campaigns, makeDonation, addCampaign } = useData();
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<FundraisingCampaign | null>(null);
  const [newCampaign, setNewCampaign] = useState({ title: '', goal: 1000, description: ''});

  const handleDonateClick = (campaign: FundraisingCampaign) => {
    setSelectedCampaign(campaign);
    setIsDonateModalOpen(true);
  };

  const handleDonationSubmit = (e: React.FormEvent, amount: number) => {
    e.preventDefault();
    if (!selectedCampaign) return;
    makeDonation(selectedCampaign.id, amount);
    setIsDonateModalOpen(false);
    setSelectedCampaign(null);
  };
  
  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    addCampaign(newCampaign);
    setIsCreateModalOpen(false);
    setNewCampaign({ title: '', goal: 1000, description: '' });
  };

  const DonationModal: React.FC = () => {
    const [amount, setAmount] = useState(50);
    if (!selectedCampaign) return null;
    return (
        <Modal isOpen={isDonateModalOpen} onClose={() => setIsDonateModalOpen(false)} title={`Donate to ${selectedCampaign.title}`}>
            <form onSubmit={(e) => handleDonationSubmit(e, amount)}>
                <p className="mb-4">Your contribution will make a difference. Thank you for your support!</p>
                <label className="block text-gray-700 text-sm font-bold mb-2">Donation Amount ($)</label>
                <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value, 10))}
                    className="w-full border p-2 rounded mb-4"
                    min="5"
                />
                <p className="text-xs text-gray-500 mb-4">This is a mock donation form. No real payment will be processed.</p>
                <div className="flex justify-end">
                    <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
                        Donate ${amount}
                    </button>
                </div>
            </form>
        </Modal>
    );
  }
  
  const CreateCampaignModal: React.FC = () => (
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Campaign">
          <form onSubmit={handleCreateCampaign} className="space-y-4">
                <input name="title" value={newCampaign.title} onChange={(e) => setNewCampaign({...newCampaign, title: e.target.value})} placeholder="Campaign Title" className="w-full border p-2 rounded" required />
                <div>
                    <label className="font-semibold">Fundraising Goal ($)</label>
                    <input name="goal" type="number" value={newCampaign.goal} onChange={(e) => setNewCampaign({...newCampaign, goal: parseInt(e.target.value) || 0})} className="w-full border p-2 rounded" required />
                </div>
                <textarea name="description" value={newCampaign.description} onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})} placeholder="Campaign Description" className="w-full border p-2 rounded" rows={4} required></textarea>
                <div className="flex justify-end">
                    <button type="submit" className="bg-brand-primary text-white font-bold py-2 px-4 rounded hover:bg-brand-dark">Create Campaign</button>
                </div>
          </form>
      </Modal>
  )

  return (
    <div className="p-4 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Fundraising Campaigns</h1>
            <p className="text-gray-600 mt-1">Support the university's mission and help current students.</p>
          </div>
           {user?.role === UserRole.Admin && (
              <button onClick={() => setIsCreateModalOpen(true)} className="bg-brand-primary text-white font-bold py-2 px-4 rounded-md hover:bg-brand-dark transition-colors">
                  Create Campaign
              </button>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map(campaign => {
            const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);
            return (
              <Card key={campaign.id}>
                <h2 className="text-xl font-bold text-brand-dark">{campaign.title}</h2>
                <p className="mt-2 text-gray-700">{campaign.description}</p>
                <div className="mt-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm font-semibold text-gray-700">
                      ${campaign.raised.toLocaleString()} raised
                    </span>
                    <span className="text-sm text-gray-500">
                      Goal: ${campaign.goal.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-brand-secondary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
                <div className="text-right mt-4">
                  <button onClick={() => handleDonateClick(campaign)} className="bg-brand-accent text-brand-dark font-bold py-2 px-4 rounded hover:opacity-90">
                    Donate Now
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <DonationModal />
      <CreateCampaignModal />
    </div>
  );
};

export default Fundraising;
