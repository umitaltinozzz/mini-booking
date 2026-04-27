'use client';

import React from 'react';
import { ChairLoadWidget } from './widgets/ChairLoadWidget';

export function BarberOverview() {
    const MOCK_STAFF = [
        { id: 's1', name: 'Canberk H.', role: 'Senior Barber', chairs: [1, 2], active: true, load: 85 },
        { id: 's2', name: 'Mehmet A.', role: 'Style Master', chairs: [3], active: true, load: 45 },
        { id: 's3', name: 'Deniz K.', role: 'Junior Barber', chairs: [4], active: false, load: 0 },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Staff Status Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_STAFF.map((staff) => (
                    <div key={staff.id} className="bg-brand-surface border border-brand-border rounded-[28px] p-6 space-y-6 group hover:border-brand-accent/30 transition-all">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black ${staff.active ? 'bg-brand-accent/10 text-brand-accent' : 'bg-brand-surface2 text-brand-muted'}`}>
                                    {staff.name[0]}
                                </div>
                                <div>
                                    <h3 className="font-black text-brand-text group-hover:text-brand-accent transition-colors">{staff.name}</h3>
                                    <p className="text-[10px] font-black text-brand-muted uppercase tracking-widest">{staff.role}</p>
                                </div>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${staff.active ? 'bg-brand-accent' : 'bg-brand-muted/30'}`} />
                        </div>

                        <div className="flex gap-2">
                            {staff.chairs.map(c => (
                                <div key={c} className="px-3 py-1.5 rounded-lg bg-brand-surface2 border border-brand-border text-[10px] font-black text-brand-text">
                                    KOLTUK {c}
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                <span className="text-brand-muted">Günlük Doluluk</span>
                                <span className="text-brand-accent">{staff.load}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-brand-surface2 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-brand-accent transition-all duration-1000"
                                    style={{ width: `${staff.load}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Resource Load Widget */}
            <div className="lg:col-span-4">
                <ChairLoadWidget />
            </div>
        </div>
    );
}
